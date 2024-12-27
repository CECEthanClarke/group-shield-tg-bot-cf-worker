/**
 * https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker
 */
import telegram from './telegram'
import i18n from './i18n'
import config from './config'
import util from './util'

async function processUpdate(env, update) {
	try {
		if (update) {
			const msg = update.message;
			if (msg) {
				const type = msg.chat.type;
				const text = msg.text || msg.caption;
				if (text) {
					if (text.startsWith('/start')) {
						const match = text.match(/V_([^\s&]+)/);
						if (match) {
							const verify_chat_id = match[1];
							const data = await env.MY_KV.get(config.GROUP_KV_PREFIX + msg.from.id + ":" + verify_chat_id);
							if (data) {
								const result = JSON.parse(data);

								const quiz = util.generateAdditionQuiz(6);
								console.log(quiz);
								await env.MY_KV.put(config.QUIZ_KV_PREFIX + quiz.id, JSON.stringify({ ...result, ...quiz }), { expirationTtl: result.verification_expiration_seconds + 5 });

								let send_text = i18n.trans(env.LANGUAGE_CODE).verifying_send_text;
								send_text = send_text.replace("${chat_title}", `<code>${result.chat_title}</code>`);
								send_text += `\n\n${quiz.question}`;

								const option_inline_keyboard = [];
								for (let i = 0; i < quiz.options.length; i++) {
									const option = quiz.options[i];
									option_inline_keyboard.push({
										text: `${option}`,
										callback_data: `answer|${quiz.id}|${option}`
									});
								}

								await telegram.sendMessage(env.BOT_TOKEN, {
									chat_id: msg.chat.id,
									text: send_text,
									parse_mode: 'HTML',
									reply_to_message_id: msg.message_id,
									disable_web_page_preview: true,
									reply_markup: {
										inline_keyboard: [
											option_inline_keyboard
										]
									}
								});
							} else {
								await telegram.sendMessage(env.BOT_TOKEN, {
									chat_id: msg.chat.id,
									text: i18n.trans(env.LANGUAGE_CODE).you_dont_have_verification_in_group,
									reply_to_message_id: msg.message_id,
								});
							}
						}
						else {
							await telegram.sendMessage(env.BOT_TOKEN, {
								chat_id: msg.chat.id,
								text: `${i18n.trans(env.LANGUAGE_CODE).start_text}`,
								parse_mode: 'HTML',
								reply_to_message_id: msg.message_id,
								disable_web_page_preview: true,
								reply_markup: {
									inline_keyboard: [
										[
											{ text: `${i18n.trans(env.LANGUAGE_CODE).invite_to_join_group}`, url: `https://t.me/${env.BOT_USERNAME}?startgroup=BotUrlInviteJoin` }
										]
									]
								}
							});
						}
					}
					else if (text.startsWith('/help')) {
						await telegram.sendMessage(env.BOT_TOKEN, {
							chat_id: msg.chat.id,
							text: `${i18n.trans(env.LANGUAGE_CODE).help_text}`,
							parse_mode: 'HTML',
							reply_to_message_id: msg.message_id,
						});
					}
				}
			}

			const chat_member_updated = update.chat_member || update.my_chat_member;
			if (chat_member_updated) {
				const new_chat_member = chat_member_updated.new_chat_member;
				const chat = chat_member_updated.chat;
				if (new_chat_member && chat && chat.type.includes('group')) {
					const status = new_chat_member.status;
					const new_chat_member_user = new_chat_member.user;
					if (status === 'member' && !new_chat_member_user.is_bot) {
						const chat_id = String(chat.id);
						const user_id = String(new_chat_member_user.id);
						const user_name = `${new_chat_member_user.first_name || ''}${new_chat_member_user.last_name || ''}`;
						const chat_title = chat.title;
						const verification_expiration_seconds = parseInt(env.VERIFICATION_EXPIRATION_SECONDS || config.VERIFICATION_EXPIRATION_SECONDS);

						let send_text = i18n.trans(env.LANGUAGE_CODE).group_verification_text;
						send_text = send_text.replace("${user_name}", `<a href="tg://user?id=${user_id}">${user_name}</a>`);
						send_text = send_text.replace("${seconds}", verification_expiration_seconds);
						send_text = send_text.replace("${chat_title}", `<code>${chat_title}</code>`);
						const rsp = await telegram.sendMessage(env.BOT_TOKEN, {
							chat_id: chat_id,
							text: send_text,
							parse_mode: 'HTML',
							reply_markup: {
								inline_keyboard: [
									[
										{ text: i18n.trans(env.LANGUAGE_CODE).click_to_verify, url: `https://t.me/${env.BOT_USERNAME}?start=V_${chat_id}` }
									]
								]
							}
						}).catch(e => console.log(e));
						if (rsp.ok) {
							const message = rsp.result;
							await env.MY_KV.put(config.GROUP_KV_PREFIX + user_id + ":" + chat_id, JSON.stringify({
								chat_id,
								user_id,
								unix_timestamp: util.getUnixTimestamp(),
								verification_expiration_seconds,
								chat_title,
								verification_message_id: message.message_id
							}), {
								expirationTtl: config.KV_EXPIRATION_TTL
							});
							await telegram.restrictChatMember(env.BOT_TOKEN, {
								chat_id,
								user_id,
								permissions: {
									can_send_messages: false,
									can_send_audios: false,
									can_send_documents: false,
									can_send_photos: false,
									can_send_videos: false,
									can_send_video_notes: false,
									can_send_voice_notes: false,
									can_send_polls: false,
									can_send_other_messages: false,
									can_add_web_page_previews: false,
									can_change_info: false,
									can_invite_users: false,
									can_pin_messages: false,
									can_manage_topics: false
								},
								use_independent_chat_permissions: true,
								until_date: util.getUnixTimestamp()
							}).catch(e => console.log(e));
						}
					} else if (status === 'restricted' && !new_chat_member_user.is_bot && !new_chat_member.is_member) {
						// remove verification message
						const chat_id = String(chat.id);
						const user_id = String(new_chat_member_user.id);
						const data = await env.MY_KV.get(config.GROUP_KV_PREFIX + user_id + ":" + chat_id);
						if (data) {
							const result = JSON.parse(data);
							await env.MY_KV.delete(config.GROUP_KV_PREFIX + user_id + ":" + chat_id);
							await telegram.deleteMessage(env.BOT_TOKEN, { chat_id: chat_id, message_id: result.verification_message_id });
						}
					}
				}
			}

			const callback_query = update.callback_query;
			if (callback_query) {
				const data = callback_query.data;
				if (data) {
					const dataSplit = data.split('|');
					const method = dataSplit[0];
					if (method) {
						const quizId = dataSplit[1];
						const answer = dataSplit[2];
						const quizStr = await env.MY_KV.get(config.QUIZ_KV_PREFIX + quizId);
						if (quizStr) {
							const quiz = JSON.parse(quizStr);
							if (callback_query.from.id == quiz.user_id) {
								try {
									if (answer == quiz.correctAnswer) {
										// unlock
										const chat = await telegram.getChat(env.BOT_TOKEN, { chat_id: quiz.chat_id });
										await telegram.restrictChatMember(env.BOT_TOKEN, {
											chat_id: quiz.chat_id,
											user_id: quiz.user_id,
											use_independent_chat_permissions: false,
											permissions: chat.result.permissions,
											until_date: util.getUnixTimestamp() + 31
										}).catch(e => console.log(e));
										await telegram.sendMessage(env.BOT_TOKEN, { chat_id: quiz.user_id, text: i18n.trans(env.LANGUAGE_CODE).chosen_answer_correct_text, reply_to_message_id: callback_query.message.message_id, });
									} else {
										// remove
										const re_join_seconds = parseInt(env.RE_JOIN_SECONDS || config.RE_JOIN_SECONDS);
										const until_date = util.getUnixTimestamp() + re_join_seconds;
										console.log(until_date);
										await telegram.banChatMember(env.BOT_TOKEN, { chat_id: quiz.chat_id, user_id: quiz.user_id, until_date }).catch(e => console.log(e));

										let send_text = i18n.trans(env.LANGUAGE_CODE).wrong_choice_text;
										send_text = send_text.replace("${answer}", quiz.correctAnswer);
										send_text = send_text.replace("${seconds}", re_join_seconds);
										await telegram.sendMessage(env.BOT_TOKEN, { chat_id: quiz.user_id, text: send_text, reply_to_message_id: callback_query.message.message_id, });
									}
								} finally {
									await env.MY_KV.delete(config.QUIZ_KV_PREFIX + quiz.id);
									await env.MY_KV.delete(config.GROUP_KV_PREFIX + quiz.user_id + ":" + quiz.chat_id);
									await telegram.deleteMessage(env.BOT_TOKEN, { chat_id: quiz.chat_id, message_id: quiz.verification_message_id }).catch(e => console.log(e));
								}
							}
						} else {
							await telegram.answerCallbackQuery(env.BOT_TOKEN, {
								callback_query_id: callback_query.id,
								show_alert: true,
								text: i18n.trans(env.LANGUAGE_CODE).verification_expired
							});
						}
					}
				}
			}
		}
		return true;
	} catch (e) {
		throw e;
	}
}

async function processGroupKV(env) {
	try {
		const lock = await env.MY_KV.get(config.SCHEDULE_LOCK_KV_KEY);
		if (lock) {
			return { lock: true };
		}
		console.log("process group kv...");
		try {
			await env.MY_KV.put(config.SCHEDULE_LOCK_KV_KEY, 'lock', { expirationTtl: 180 });
			const items = await env.MY_KV.list({ prefix: config.GROUP_KV_PREFIX });
			console.log(items);
			if (items) {
				if (items.keys) {
					for (let i = 0; i < items.keys.length; i++) {
						const key = items.keys[i].name;
						console.log(key);
						const unix = util.getUnixTimestamp();
						const data = await env.MY_KV.get(key);
						console.log(data);
						if (data) {
							const result = JSON.parse(data);

							const seconds = unix - result.unix_timestamp;
							if (seconds >= result.verification_expiration_seconds) {
								// remove
								const re_join_seconds = parseInt(env.RE_JOIN_SECONDS || config.RE_JOIN_SECONDS);
								const until_date = util.getUnixTimestamp() + re_join_seconds;
								console.log(until_date);
								await telegram.banChatMember(env.BOT_TOKEN, { chat_id: result.chat_id, user_id: result.user_id, until_date }).catch(e => console.log(e));
								await telegram.deleteMessage(env.BOT_TOKEN, { chat_id: result.chat_id, message_id: result.verification_message_id }).catch(e => console.log(e));
								await env.MY_KV.delete(key);
							}
						}
					}
				}
			}
		} finally {
			await env.MY_KV.delete(config.SCHEDULE_LOCK_KV_KEY);
		}
		return { lock: false };
	} catch (e) {
		console.log(e);
	}
}

export default {
	async fetch(request, env, ctx) {
		try {
			const secret_token = request.headers.get('x-telegram-bot-api-secret-token');
			// console.log(secret_token);
			if (secret_token && secret_token === env.BOT_SECRET_TOKEN) {
				const update = await request.json();
				console.log(update);
				const result = await processUpdate(env, update).catch(e => console.log(e));
				if (result) {
					return Response.json({ ok: true, error: false });
				} else {
					return Response.json({ ok: false, error: true });
				}
			} else {
				return Response.json({ ok: false, error: true });
			}
		} catch (err) {
			console.log(err);
			return Response.json({ ok: false, error: true });
		}
	},

	async scheduled(event, env, ctx) {
		ctx.waitUntil(processGroupKV(env));
	},
};
