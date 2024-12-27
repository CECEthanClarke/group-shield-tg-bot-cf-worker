const translations = {
  en: {
    invite_to_join_group: "Invite to join the group",
    start_text: "This is an open-source group verification Telegram bot, running serverless on Cloudflare Workers, with simple operations and easy deployment. https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    help_text: "This is an open-source group verification Telegram bot, running serverless on Cloudflare Workers, with simple operations and easy deployment. https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    group_verification_text: "Welcome ${user_name} to ${chat_title} group! Please complete the verification to join. You have ${seconds} seconds to finish the verification, or it will expire.",
    click_to_verify: "Click to verify",
    you_dont_have_verification_in_group: "You don’t have the required verification in this group.",
    verifying_send_text: "You are verifying in the ${chat_title} group. Please answer the following question by clicking one of the options below.",
    verification_expired: "This verification has expired. Please return to the group and click to verify again.",
    wrong_choice_text: "Wrong choice, the correct answer is ${answer}. You have been kicked out of the group. You can rejoin the group in ${seconds} seconds after re-verification.",
    chosen_answer_correct_text: "Your chosen answer is correct. You can now speak freely in the group.",
  },
  es: {
    invite_to_join_group: "Invitar a unirse al grupo",
    start_text: "Este es un bot de verificación de grupos de Telegram de código abierto, que se ejecuta sin servidor en Cloudflare Workers, con operaciones simples y fácil implementación. https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    help_text: "Este es un bot de verificación de grupos de Telegram de código abierto, que se ejecuta sin servidor en Cloudflare Workers, con operaciones simples y fácil implementación. https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    group_verification_text: "¡Bienvenido ${user_name} al grupo ${chat_title}! Por favor, completa la verificación para unirte. Tienes ${seconds} segundos para finalizar la verificación, o expirará.",
    click_to_verify: "Haz clic para verificar",
    you_dont_have_verification_in_group: "No tienes la verificación requerida en este grupo.",
    verifying_send_text: "Estás verificándote en el grupo ${chat_title}. Responde la siguiente pregunta seleccionando una de las opciones a continuación.",
    verification_expired: "Esta verificación ha expirado. Por favor, regresa al grupo y haz clic para verificar de nuevo.",
    wrong_choice_text: "Respuesta incorrecta, la respuesta correcta es ${answer}. Has sido expulsado del grupo. Puedes volver a unirte en ${seconds} segundos después de la re-verificación.",
    chosen_answer_correct_text: "Tu respuesta es correcta. Ahora puedes hablar libremente en el grupo.",
  },
  ru: {
    invite_to_join_group: "Пригласить в группу",
    start_text: "Это бот для верификации групп в Telegram с открытым исходным кодом, работающий без сервера на Cloudflare Workers, с простыми операциями и легкой разверткой. https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    help_text: "Это бот для верификации групп в Telegram с открытым исходным кодом, работающий без сервера на Cloudflare Workers, с простыми операциями и легкой разверткой. https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    group_verification_text: "Добро пожаловать ${user_name} в группу ${chat_title}! Пожалуйста, пройдите верификацию, чтобы присоединиться. У вас есть ${seconds} секунд, чтобы завершить верификацию, иначе она истечет.",
    click_to_verify: "Нажмите для верификации",
    you_dont_have_verification_in_group: "У вас нет необходимой верификации в этой группе.",
    verifying_send_text: "Вы проходите верификацию в группе ${chat_title}. Ответьте на следующий вопрос, выбрав один из вариантов ниже.",
    verification_expired: "Эта верификация истекла. Пожалуйста, вернитесь в группу и нажмите для повторной верификации.",
    wrong_choice_text: "Неправильный выбор, правильный ответ - ${answer}. Вы были исключены из группы. Вы можете повторно присоединиться через ${seconds} секунд после повторной верификации.",
    chosen_answer_correct_text: "Ваш ответ правильный. Теперь вы можете свободно общаться в группе.",
  },
  zh: {
    invite_to_join_group: "邀请加入群组",
    start_text: "这是一个开源的群组验证Telegram机器人，在Cloudflare Workers上无服务器运行，操作简单，部署容易。https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    help_text: "这是一个开源的群组验证Telegram机器人，在Cloudflare Workers上无服务器运行，操作简单，部署容易。https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    group_verification_text: "欢迎 ${user_name} 加入 ${chat_title} 群组！请完成验证以加入。您有 ${seconds} 秒完成验证，否则验证将失效。",
    click_to_verify: "点击进行验证",
    you_dont_have_verification_in_group: "您在此群组中没有所需的验证。",
    verifying_send_text: "您正在 ${chat_title} 群组中进行验证。请通过点击以下选项回答问题。",
    verification_expired: "此验证已过期。请返回群组并点击重新验证。",
    wrong_choice_text: "选择错误，正确答案是 ${answer}。您已被移出群组。重新验证后，您可以在 ${seconds} 秒后重新加入。",
    chosen_answer_correct_text: "您选择的答案正确。现在您可以在群组中自由发言。",
  },
  fr: {
    invite_to_join_group: "Inviter à rejoindre le groupe",
    start_text: "Ceci est un bot de vérification de groupe Telegram open-source, fonctionnant sans serveur sur Cloudflare Workers, avec des opérations simples et un déploiement facile. https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    help_text: "Ceci est un bot de vérification de groupe Telegram open-source, fonctionnant sans serveur sur Cloudflare Workers, avec des opérations simples et un déploiement facile. https://github.com/CECEthanClarke/group-shield-tg-bot-cf-worker",
    group_verification_text: "Bienvenue ${user_name} dans le groupe ${chat_title} ! Veuillez terminer la vérification pour rejoindre. Vous avez ${seconds} secondes pour terminer la vérification, sinon elle expirera.",
    click_to_verify: "Cliquez pour vérifier",
    you_dont_have_verification_in_group: "Vous n'avez pas la vérification requise dans ce groupe.",
    verifying_send_text: "Vous vous vérifiez dans le groupe ${chat_title}. Répondez à la question suivante en cliquant sur l'une des options ci-dessous.",
    verification_expired: "Cette vérification a expiré. Retournez dans le groupe et cliquez pour vérifier à nouveau.",
    wrong_choice_text: "Mauvais choix, la bonne réponse est ${answer}. Vous avez été expulsé du groupe. Vous pouvez rejoindre à nouveau dans ${seconds} secondes après re-vérification.",
    chosen_answer_correct_text: "Votre réponse est correcte. Vous pouvez maintenant parler librement dans le groupe.",
  }
};

function trans(language_code) {
  return translations[language_code ? language_code.replace('-', '_') : 'en']
}

const i18n = { trans }
export default i18n;