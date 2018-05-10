declare module "telegram-typings" {
  /**
   * A placeholder, currently holds no information. Use BotFather to set up
   * your game.
   */
  declare type CallbackGame = {};

  /**
   * This object represents the contents of a file to be uploaded. Must be
   * posted using multipart/form-data in the usual way that files are
   * uploaded via the browser.
   */
  declare type InputFile = {};

  /**
   * This object represents the content of a message to be sent as a result
   * of an inline query.
   */
  declare type InputMessageContent =
    | InputTextMessageContent
    | InputLocationMessageContent
    | InputVenueMessageContent
    | InputContactMessageContent;

  /**
   * This object represents the content of a media message to be sent.
   */
  declare type InputMedia = InputMediaPhoto | InputMediaVideo;

  /**
   * This object represents one result of an inline query
   */
  declare type InlineQueryResult =
    | InlineQueryResultCachedAudio
    | InlineQueryResultCachedDocument
    | InlineQueryResultCachedGif
    | InlineQueryResultCachedMpeg4Gif
    | InlineQueryResultCachedPhoto
    | InlineQueryResultCachedSticker
    | InlineQueryResultCachedVideo
    | InlineQueryResultCachedVoice
    | InlineQueryResultArticle
    | InlineQueryResultAudio
    | InlineQueryResultContact
    | InlineQueryResultGame
    | InlineQueryResultDocument
    | InlineQueryResultGif
    | InlineQueryResultLocation
    | InlineQueryResultMpeg4Gif
    | InlineQueryResultPhoto
    | InlineQueryResultVenue
    | InlineQueryResultVideo
    | InlineQueryResultVoice;

  /**
   * This object represents an incoming update.At most one of the optional
   * parameters can be present in any given update.
   * @see https://core.telegram.org/bots/api#available-types
   */
  declare type Update = {
    /**
     * The update‘s unique identifier. Update identifiers start from a certain
     * positive number and increase sequentially. This ID becomes especially
     * handy if you’re using Webhooks, since it allows you to ignore repeated
     * updates or to restore the correct update sequence, should they get out
     * of order. If there are no new updates for at least a week, then
     * identifier of the next update will be chosen randomly instead of sequentially.
     * @see https://core.telegram.org/bots/api#setwebhook
     */
    update_id: number,

    /**
     * New incoming message of any kind — text, photo, sticker, etc.
     */
    message?: Message,

    /**
     * New version of a message that is known to the bot and was edited
     */
    edited_message?: Message,

    /**
     * New incoming channel post of any kind — text, photo, sticker, etc.
     */
    channel_post?: Message,

    /**
     * New version of a channel post that is known to the bot and was edited
     */
    edited_channel_post?: Message,

    /**
     * New incoming inline query
     * @see https://core.telegram.org/bots/api#inline-mode
     */
    inline_query?: InlineQuery,

    /**
     * The result of an inline query that was chosen by a user and sent to
     * their chat partner. Please see our documentation on the feedback
     * collecting for details on how to enable these updates for your bot.
     * @see https://core.telegram.org/bots/api#inline-mode
     * @see https://core.telegram.org/bots/api/bots/inline#collecting-feedback
     */
    chosen_inline_result?: ChosenInlineResult,

    /**
     * New incoming callback query
     */
    callback_query?: CallbackQuery,

    /**
     * New incoming shipping query. Only for invoices with flexible price
     */
    shipping_query?: ShippingQuery,

    /**
     * New incoming pre-checkout query. Contains full information about checkout
     */
    pre_checkout_query?: PreCheckoutQuery,
  };

  /**
   * Use this method to receive incoming updates using long polling (wiki).
   * An Array of Update objects is returned.
   * @see http://en.wikipedia.org/wiki/Push_technology#Long_polling
   * @see https://core.telegram.org/bots/api#update
   */
  declare type GetUpdatesPayload = {
    /**
     * Identifier of the first update to be returned. Must be greater by one
     * than the highest among the identifiers of previously received updates.
     * By default, updates starting with the earliest unconfirmed update are
     * returned. An update is considered confirmed as soon as getUpdates is
     * called with an offset higher than its update_id. The negative offset can
     * be specified to retrieve updates starting from -offset update from the
     * end of the updates queue. All previous updates will forgotten.
     * @see https://core.telegram.org/bots/api#getupdates
     */
    offset?: number,

    /**
     * Limits the number of updates to be retrieved. Values between 1—100 are
     * accepted. Defaults to 100.
     */
    limit?: number,

    /**
     * Timeout in seconds for long polling. Defaults to 0, i.e. usual short
     * polling. Should be positive, short polling should be used for testing
     * purposes only.
     */
    timeout?: number,

    /**
     * List the types of updates you want your bot to receive. For example,
     * specify [“message”, “edited_channel_post”, “callback_query”] to only
     * receive updates of these types. See Update for a complete list of
     * available update types. Specify an empty list to receive all updates
     * regardless of type (default). If not specified, the previous setting
     * will be used.Please note that this parameter doesn't affect updates
     * created before the call to the getUpdates, so unwanted updates may be
     * received for a short period of time.
     * @see https://core.telegram.org/bots/api#update
     */
    allowed_updates?: string[],
  };

  /**
   * Use this method to specify a url and receive incoming updates via an
   * outgoing webhook. Whenever there is an update for the bot, we will send
   * an HTTPS POST request to the specified url, containing a JSON-serialized
   * Update. In case of an unsuccessful request, we will give up after a
   * reasonable amount of attempts. Returns true.
   * @see https://core.telegram.org/bots/api#update
   */
  declare type SetWebhookPayload = {
    /**
     * HTTPS url to send updates to. Use an empty string to remove webhook integration
     */
    url: string,

    /**
     * Upload your public key certificate so that the root certificate in use
     * can be checked. See our self-signed guide for details.
     * @see https://core.telegram.org/bots/api/bots/self-signed
     */
    certificate?: InputFile,

    /**
     * Maximum allowed number of simultaneous HTTPS connections to the webhook
     * for update delivery, 1-100. Defaults to 40. Use lower values to limit
     * the load on your bot‘s server, and higher values to increase your bot’s throughput.
     */
    max_connections?: number,

    /**
     * List the types of updates you want your bot to receive. For example,
     * specify [“message”, “edited_channel_post”, “callback_query”] to only
     * receive updates of these types. See Update for a complete list of
     * available update types. Specify an empty list to receive all updates
     * regardless of type (default). If not specified, the previous setting
     * will be used.Please note that this parameter doesn't affect updates
     * created before the call to the setWebhook, so unwanted updates may be
     * received for a short period of time.
     * @see https://core.telegram.org/bots/api#update
     */
    allowed_updates?: string[],
  };

  /**
   * Contains information about the current status of a webhook.
   */
  declare type WebhookInfo = {
    /**
     * Webhook URL, may be empty if webhook is not set up
     */
    url: string,

    /**
     * True, if a custom certificate was provided for webhook certificate checks
     */
    has_custom_certificate: boolean,

    /**
     * Number of updates awaiting delivery
     */
    pending_update_count: number,

    /**
     * Unix time for the most recent error that happened when trying to deliver
     * an update via webhook
     */
    last_error_date?: number,

    /**
     * Error message in human-readable format for the most recent error that
     * happened when trying to deliver an update via webhook
     */
    last_error_message?: string,

    /**
     * Maximum allowed number of simultaneous HTTPS connections to the webhook
     * for update delivery
     */
    max_connections?: number,

    /**
     * A list of update types the bot is subscribed to. Defaults to all update types
     */
    allowed_updates?: string[],
  };

  /**
   * This object represents a Telegram user or bot.
   */
  declare type User = {
    /**
     * Unique identifier for this user or bot
     */
    id: number,

    /**
     * True, if this user is a bot
     */
    is_bot: boolean,

    /**
     * User‘s or bot’s first name
     */
    first_name: string,

    /**
     * User‘s or bot’s last name
     */
    last_name?: string,

    /**
     * User‘s or bot’s username
     */
    username?: string,

    /**
     * IETF language tag of the user's language
     * @see https://en.wikipedia.org/wiki/IETF_language_tag
     */
    language_code?: string,
  };

  /**
   * This object represents a chat.
   */
  declare type Chat = {
    /**
     * Unique identifier for this chat. This number may be greater than 32 bits
     * and some programming languages may have difficulty/silent defects in
     * interpreting it. But it is smaller than 52 bits, so a signed 64 bit
     * integer or double-precision float type are safe for storing this identifier.
     */
    id: number,

    /**
     * Type of chat, can be either “private”, “group”, “supergroup” or “channel”
     */
    type: string,

    /**
     * Title, for supergroups, channels and group chats
     */
    title?: string,

    /**
     * Username, for private chats, supergroups and channels if available
     */
    username?: string,

    /**
     * First name of the other party in a private chat
     */
    first_name?: string,

    /**
     * Last name of the other party in a private chat
     */
    last_name?: string,

    /**
     * True if a group has ‘All Members Are Admins’ enabled.
     */
    all_members_are_administrators?: boolean,

    /**
     * Chat photo. Returned only in getChat.
     * @see https://core.telegram.org/bots/api#getchat
     */
    photo?: ChatPhoto,

    /**
     * Description, for supergroups and channel chats. Returned only in getChat.
     * @see https://core.telegram.org/bots/api#getchat
     */
    description?: string,

    /**
     * Chat invite link, for supergroups and channel chats. Returned only in getChat.
     * @see https://core.telegram.org/bots/api#getchat
     */
    invite_link?: string,

    /**
     * Pinned message, for supergroups and channel chats. Returned only in getChat.
     * @see https://core.telegram.org/bots/api#getchat
     */
    pinned_message?: Message,

    /**
     * For supergroups, name of group sticker set. Returned only in getChat.
     * @see https://core.telegram.org/bots/api#getchat
     */
    sticker_set_name?: string,

    /**
     * True, if the bot can change the group sticker set. Returned only in getChat.
     * @see https://core.telegram.org/bots/api#getchat
     */
    can_set_sticker_set?: boolean,
  };

  /**
   * This object represents a message.
   */
  declare type Message = {
    /**
     * Unique message identifier inside this chat
     */
    message_id: number,

    /**
     * Sender, empty for messages sent to channels
     */
    from?: User,

    /**
     * Date the message was sent in Unix time
     */
    date: number,

    /**
     * Conversation the message belongs to
     */
    chat: Chat,

    /**
     * For forwarded messages, sender of the original message
     */
    forward_from?: User,

    /**
     * For messages forwarded from channels, information about the original channel
     */
    forward_from_chat?: Chat,

    /**
     * For messages forwarded from channels, identifier of the original message
     * in the channel
     */
    forward_from_message_id?: number,

    /**
     * For messages forwarded from channels, signature of the post author if present
     */
    forward_signature?: string,

    /**
     * For forwarded messages, date the original message was sent in Unix time
     */
    forward_date?: number,

    /**
     * For replies, the original message. Note that the Message object in this
     * field will not contain further reply_to_message fields even if it itself
     * is a reply.
     */
    reply_to_message?: Message,

    /**
     * Date the message was last edited in Unix time
     */
    edit_date?: number,

    /**
     * The unique identifier of a media message group this message belongs to
     */
    media_group_id?: string,

    /**
     * Signature of the post author for messages in channels
     */
    author_signature?: string,

    /**
     * For text messages, the actual UTF-8 text of the message, 0-4096 characters.
     */
    text?: string,

    /**
     * For text messages, special entities like usernames, URLs, bot commands,
     * etc. that appear in the text
     */
    entities?: MessageEntity[],

    /**
     * For messages with a caption, special entities like usernames, URLs, bot
     * commands, etc. that appear in the caption
     */
    caption_entities?: MessageEntity[],

    /**
     * Message is an audio file, information about the file
     */
    audio?: Audio,

    /**
     * Message is a general file, information about the file
     */
    document?: Document,

    /**
     * Message is a game, information about the game. More about games »
     * @see https://core.telegram.org/bots/api#games
     */
    game?: Game,

    /**
     * Message is a photo, available sizes of the photo
     */
    photo?: PhotoSize[],

    /**
     * Message is a sticker, information about the sticker
     */
    sticker?: Sticker,

    /**
     * Message is a video, information about the video
     */
    video?: Video,

    /**
     * Message is a voice message, information about the file
     */
    voice?: Voice,

    /**
     * Message is a video note, information about the video message
     * @see https://telegram.org/blog/video-messages-and-telescope
     */
    video_note?: VideoNote,

    /**
     * Caption for the audio, document, photo, video or voice, 0-200 characters
     */
    caption?: string,

    /**
     * Message is a shared contact, information about the contact
     */
    contact?: Contact,

    /**
     * Message is a shared location, information about the location
     */
    location?: Location,

    /**
     * Message is a venue, information about the venue
     */
    venue?: Venue,

    /**
     * New members that were added to the group or supergroup and information
     * about them (the bot itself may be one of these members)
     */
    new_chat_members?: User[],

    /**
     * A member was removed from the group, information about them (this member
     * may be the bot itself)
     */
    left_chat_member?: User,

    /**
     * A chat title was changed to this value
     */
    new_chat_title?: string,

    /**
     * A chat photo was change to this value
     */
    new_chat_photo?: PhotoSize[],

    /**
     * Service message: the chat photo was deleted
     */
    delete_chat_photo?: true,

    /**
     * Service message: the group has been created
     */
    group_chat_created?: true,

    /**
     * Service message: the supergroup has been created. This field can‘t be
     * received in a message coming through updates, because bot can’t be a
     * member of a supergroup when it is created. It can only be found in
     * reply_to_message if someone replies to a very first message in a
     * directly created supergroup.
     */
    supergroup_chat_created?: true,

    /**
     * Service message: the channel has been created. This field can‘t be
     * received in a message coming through updates, because bot can’t be a
     * member of a channel when it is created. It can only be found in
     * reply_to_message if someone replies to a very first message in a channel.
     */
    channel_chat_created?: true,

    /**
     * The group has been migrated to a supergroup with the specified
     * identifier. This number may be greater than 32 bits and some programming
     * languages may have difficulty/silent defects in interpreting it. But it
     * is smaller than 52 bits, so a signed 64 bit integer or double-precision
     * float type are safe for storing this identifier.
     */
    migrate_to_chat_id?: number,

    /**
     * The supergroup has been migrated from a group with the specified
     * identifier. This number may be greater than 32 bits and some programming
     * languages may have difficulty/silent defects in interpreting it. But it
     * is smaller than 52 bits, so a signed 64 bit integer or double-precision
     * float type are safe for storing this identifier.
     */
    migrate_from_chat_id?: number,

    /**
     * Specified message was pinned. Note that the Message object in this field
     * will not contain further reply_to_message fields even if it is itself a reply.
     */
    pinned_message?: Message,

    /**
     * Message is an invoice for a payment, information about the invoice. More
     * about payments »
     * @see https://core.telegram.org/bots/api#payments
     */
    invoice?: Invoice,

    /**
     * Message is a service message about a successful payment, information
     * about the payment. More about payments »
     * @see https://core.telegram.org/bots/api#payments
     */
    successful_payment?: SuccessfulPayment,

    /**
     * The domain name of the website on which the user has logged in. More
     * about Telegram Login »
     * @see https://core.telegram.org/bots/api/widgets/login
     */
    connected_website?: string,
  };

  /**
   * This object represents one special entity in a text message. For
   * example, hashtags, usernames, URLs, etc.
   */
  declare type MessageEntity = {
    /**
     * Type of the entity. Can be mention (@username), hashtag, bot_command,
     * url, email, bold (bold text), italic (italic text), code (monowidth
     * string), pre (monowidth block), text_link (for clickable text URLs),
     * text_mention (for users without usernames)
     * @see https://telegram.org/blog/edit#new-mentions
     */
    type: string,

    /**
     * Offset in UTF-16 code units to the start of the entity
     */
    offset: number,

    /**
     * Length of the entity in UTF-16 code units
     */
    length: number,

    /**
     * For “text_link” only, url that will be opened after user taps on the text
     */
    url?: string,

    /**
     * For “text_mention” only, the mentioned user
     */
    user?: User,
  };

  /**
   * This object represents one size of a photo or a file / sticker thumbnail.
   * @see https://core.telegram.org/bots/api#document
   * @see https://core.telegram.org/bots/api#sticker
   */
  declare type PhotoSize = {
    /**
     * Unique identifier for this file
     */
    file_id: string,

    /**
     * Photo width
     */
    width: number,

    /**
     * Photo height
     */
    height: number,

    /**
     * File size
     */
    file_size?: number,
  };

  /**
   * This object represents an audio file to be treated as music by the
   * Telegram clients.
   */
  declare type Audio = {
    /**
     * Unique identifier for this file
     */
    file_id: string,

    /**
     * Duration of the audio in seconds as defined by sender
     */
    duration: number,

    /**
     * Performer of the audio as defined by sender or by audio tags
     */
    performer?: string,

    /**
     * Title of the audio as defined by sender or by audio tags
     */
    title?: string,

    /**
     * MIME type of the file as defined by sender
     */
    mime_type?: string,

    /**
     * File size
     */
    file_size?: number,
  };

  /**
   * This object represents a general file (as opposed to photos, voice
   * messages and audio files).
   * @see https://core.telegram.org/bots/api#photosize
   * @see https://core.telegram.org/bots/api#voice
   * @see https://core.telegram.org/bots/api#audio
   */
  declare type Document = {
    /**
     * Unique file identifier
     */
    file_id: string,

    /**
     * Document thumbnail as defined by sender
     */
    thumb?: PhotoSize,

    /**
     * Original filename as defined by sender
     */
    file_name?: string,

    /**
     * MIME type of the file as defined by sender
     */
    mime_type?: string,

    /**
     * File size
     */
    file_size?: number,
  };

  /**
   * This object represents a video file.
   */
  declare type Video = {
    /**
     * Unique identifier for this file
     */
    file_id: string,

    /**
     * Video width as defined by sender
     */
    width: number,

    /**
     * Video height as defined by sender
     */
    height: number,

    /**
     * Duration of the video in seconds as defined by sender
     */
    duration: number,

    /**
     * Video thumbnail
     */
    thumb?: PhotoSize,

    /**
     * Mime type of a file as defined by sender
     */
    mime_type?: string,

    /**
     * File size
     */
    file_size?: number,
  };

  /**
   * This object represents a voice note.
   */
  declare type Voice = {
    /**
     * Unique identifier for this file
     */
    file_id: string,

    /**
     * Duration of the audio in seconds as defined by sender
     */
    duration: number,

    /**
     * MIME type of the file as defined by sender
     */
    mime_type?: string,

    /**
     * File size
     */
    file_size?: number,
  };

  /**
   * This object represents a video message (available in Telegram apps as of v.4.0).
   * @see https://telegram.org/blog/video-messages-and-telescope
   */
  declare type VideoNote = {
    /**
     * Unique identifier for this file
     */
    file_id: string,

    /**
     * Video width and height as defined by sender
     */
    length: number,

    /**
     * Duration of the video in seconds as defined by sender
     */
    duration: number,

    /**
     * Video thumbnail
     */
    thumb?: PhotoSize,

    /**
     * File size
     */
    file_size?: number,
  };

  /**
   * This object represents a phone contact.
   */
  declare type Contact = {
    /**
     * Contact's phone number
     */
    phone_number: string,

    /**
     * Contact's first name
     */
    first_name: string,

    /**
     * Contact's last name
     */
    last_name?: string,

    /**
     * Contact's user identifier in Telegram
     */
    user_id?: number,
  };

  /**
   * This object represents a point on the map.
   */
  declare type Location = {
    /**
     * Longitude as defined by sender
     */
    longitude: number,

    /**
     * Latitude as defined by sender
     */
    latitude: number,
  };

  /**
   * This object represents a venue.
   */
  declare type Venue = {
    /**
     * Venue location
     */
    location: Location,

    /**
     * Name of the venue
     */
    title: string,

    /**
     * Address of the venue
     */
    address: string,

    /**
     * Foursquare identifier of the venue
     */
    foursquare_id?: string,
  };

  /**
   * This object represent a user's profile pictures.
   */
  declare type UserProfilePhotos = {
    /**
     * Total number of profile pictures the target user has
     */
    total_count: number,

    /**
     * Requested profile pictures (in up to 4 sizes each)
     */
    photos: PhotoSize[][],
  };

  /**
   * This object represents a file ready to be downloaded. The file can be
   * downloaded via the link
   * https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed
   * that the link will be valid for at least 1 hour. When the link expires,
   * a new one can be requested by calling getFile.
   * @see https://core.telegram.org/bots/api#getfile
   */
  declare type File = {
    /**
     * Unique identifier for this file
     */
    file_id: string,

    /**
     * File size, if known
     */
    file_size?: number,

    /**
     * File path. Use https://api.telegram.org/file/bot<token>/<file_path> to
     * get the file.
     */
    file_path?: string,
  };

  /**
   * This object represents a custom keyboard with reply options (see
   * Introduction to bots for details and examples).
   * @see https://core.telegram.org/bots#keyboards
   */
  declare type ReplyKeyboardMarkup = {
    /**
     * Array of button rows, each represented by an Array of KeyboardButton objects
     * @see https://core.telegram.org/bots/api#keyboardbutton
     */
    keyboard: KeyboardButton[][],

    /**
     * Requests clients to resize the keyboard vertically for optimal fit
     * (e.g., make the keyboard smaller if there are just two rows of buttons).
     * Defaults to false, in which case the custom keyboard is always of the
     * same height as the app's standard keyboard.
     */
    resize_keyboard?: boolean,

    /**
     * Requests clients to hide the keyboard as soon as it's been used. The
     * keyboard will still be available, but clients will automatically display
     * the usual letter-keyboard in the chat – the user can press a special
     * button in the input field to see the custom keyboard again. Defaults to false.
     */
    one_time_keyboard?: boolean,

    /**
     * Use this parameter if you want to show the keyboard to specific users
     * only. Targets: 1) users that are @mentioned in the text of the Message
     * object; 2) if the bot's message is a reply (has reply_to_message_id),
     * sender of the original message.Example: A user requests to change the
     * bot‘s language, bot replies to the request with a keyboard to select the
     * new language. Other users in the group don’t see the keyboard.
     * @see https://core.telegram.org/bots/api#message
     */
    selective?: boolean,
  };

  /**
   * This object represents one button of the reply keyboard. For simple text
   * buttons String can be used instead of this object to specify text of the
   * button. Optional fields are mutually exclusive.
   */
  declare type KeyboardButton = {
    /**
     * Text of the button. If none of the optional fields are used, it will be
     * sent as a message when the button is pressed
     */
    text: string,

    /**
     * If True, the user's phone number will be sent as a contact when the
     * button is pressed. Available in private chats only
     */
    request_contact?: boolean,

    /**
     * If True, the user's current location will be sent when the button is
     * pressed. Available in private chats only
     */
    request_location?: boolean,
  };

  /**
   * Upon receiving a message with this object, Telegram clients will remove
   * the current custom keyboard and display the default letter-keyboard. By
   * default, custom keyboards are displayed until a new keyboard is sent by
   * a bot. An exception is made for one-time keyboards that are hidden
   * immediately after the user presses a button (see ReplyKeyboardMarkup).
   * @see https://core.telegram.org/bots/api#replykeyboardmarkup
   */
  declare type ReplyKeyboardRemove = {
    /**
     * Requests clients to remove the custom keyboard (user will not be able to
     * summon this keyboard; if you want to hide the keyboard from sight but
     * keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup)
     * @see https://core.telegram.org/bots/api#replykeyboardmarkup
     */
    remove_keyboard: true,

    /**
     * Use this parameter if you want to remove the keyboard for specific users
     * only. Targets: 1) users that are @mentioned in the text of the Message
     * object; 2) if the bot's message is a reply (has reply_to_message_id),
     * sender of the original message.Example: A user votes in a poll, bot
     * returns confirmation message in reply to the vote and removes the
     * keyboard for that user, while still showing the keyboard with poll
     * options to users who haven't voted yet.
     * @see https://core.telegram.org/bots/api#message
     */
    selective?: boolean,
  };

  /**
   * This object represents an inline keyboard that appears right next to the
   * message it belongs to.
   * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
   */
  declare type InlineKeyboardMarkup = {
    /**
     * Array of button rows, each represented by an Array of
     * InlineKeyboardButton objects
     * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
     */
    inline_keyboard: InlineKeyboardButton[][],
  };

  /**
   * This object represents one button of an inline keyboard. You must use
   * exactly one of the optional fields.
   */
  declare type InlineKeyboardButton = {
    /**
     * Label text on the button
     */
    text: string,

    /**
     * HTTP url to be opened when button is pressed
     */
    url?: string,

    /**
     * Data to be sent in a callback query to the bot when button is pressed,
     * 1-64 bytes
     * @see https://core.telegram.org/bots/api#callbackquery
     */
    callback_data?: string,

    /**
     * If set, pressing the button will prompt the user to select one of their
     * chats, open that chat and insert the bot‘s username and the specified
     * inline query in the input field. Can be empty, in which case just the
     * bot’s username will be inserted.Note: This offers an easy way for users
     * to start using your bot in inline mode when they are currently in a
     * private chat with it. Especially useful when combined with switch_pm…
     * actions – in this case the user will be automatically returned to the
     * chat they switched from, skipping the chat selection screen.
     * @see https://core.telegram.org/bots/api/bots/inline
     * @see https://core.telegram.org/bots/api#answerinlinequery
     */
    switch_inline_query?: string,

    /**
     * If set, pressing the button will insert the bot‘s username and the
     * specified inline query in the current chat's input field. Can be empty,
     * in which case only the bot’s username will be inserted.This offers a
     * quick way for the user to open your bot in inline mode in the same chat
     * – good for selecting something from multiple options.
     */
    switch_inline_query_current_chat?: string,

    /**
     * Description of the game that will be launched when the user presses the
     * button.NOTE: This type of button must always be the first button in the
     * first row.
     */
    callback_game?: CallbackGame,

    /**
     * Specify True, to send a Pay button.NOTE: This type of button must always
     * be the first button in the first row.
     * @see https://core.telegram.org/bots/api#payments
     */
    pay?: boolean,
  };

  /**
   * This object represents an incoming callback query from a callback button
   * in an inline keyboard. If the button that originated the query was
   * attached to a message sent by the bot, the field message will be
   * present. If the button was attached to a message sent via the bot (in
   * inline mode), the field inline_message_id will be present. Exactly one
   * of the fields data or game_short_name will be present.
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   * @see https://core.telegram.org/bots/api#inline-mode
   */
  declare type CallbackQuery = {
    /**
     * Unique identifier for this query
     */
    id: string,

    /**
     * Sender
     */
    from: User,

    /**
     * Message with the callback button that originated the query. Note that
     * message content and message date will not be available if the message is
     * too old
     */
    message?: Message,

    /**
     * Identifier of the message sent via the bot in inline mode, that
     * originated the query.
     */
    inline_message_id?: string,

    /**
     * Global identifier, uniquely corresponding to the chat to which the
     * message with the callback button was sent. Useful for high scores in games.
     * @see https://core.telegram.org/bots/api#games
     */
    chat_instance: string,

    /**
     * Data associated with the callback button. Be aware that a bad client can
     * send arbitrary data in this field.
     */
    data?: string,

    /**
     * Short name of a Game to be returned, serves as the unique identifier for
     * the game
     * @see https://core.telegram.org/bots/api#games
     */
    game_short_name?: string,
  };

  /**
   * Upon receiving a message with this object, Telegram clients will display
   * a reply interface to the user (act as if the user has selected the bot‘s
   * message and tapped ’Reply'). This can be extremely useful if you want to
   * create user-friendly step-by-step interfaces without having to sacrifice
   * privacy mode.
   * @see https://core.telegram.org/bots/api/bots#privacy-mode
   */
  declare type ForceReply = {
    /**
     * Shows reply interface to the user, as if they manually selected the
     * bot‘s message and tapped ’Reply'
     */
    force_reply: true,

    /**
     * Use this parameter if you want to force reply from specific users only.
     * Targets: 1) users that are @mentioned in the text of the Message object;
     * 2) if the bot's message is a reply (has reply_to_message_id), sender of
     * the original message.
     * @see https://core.telegram.org/bots/api#message
     */
    selective?: boolean,
  };

  /**
   * This object represents a chat photo.
   */
  declare type ChatPhoto = {
    /**
     * Unique file identifier of small (160x160) chat photo. This file_id can
     * be used only for photo download.
     */
    small_file_id: string,

    /**
     * Unique file identifier of big (640x640) chat photo. This file_id can be
     * used only for photo download.
     */
    big_file_id: string,
  };

  /**
   * This object contains information about one member of a chat.
   */
  declare type ChatMember = {
    /**
     * Information about the user
     */
    user: User,

    /**
     * The member's status in the chat. Can be “creator”, “administrator”,
     * “member”, “restricted”, “left” or “kicked”
     */
    status: string,

    /**
     * Restricted and kicked only. Date when restrictions will be lifted for
     * this user, unix time
     */
    until_date?: number,

    /**
     * Administrators only. True, if the bot is allowed to edit administrator
     * privileges of that user
     */
    can_be_edited?: boolean,

    /**
     * Administrators only. True, if the administrator can change the chat
     * title, photo and other settings
     */
    can_change_info?: boolean,

    /**
     * Administrators only. True, if the administrator can post in the channel,
     * channels only
     */
    can_post_messages?: boolean,

    /**
     * Administrators only. True, if the administrator can edit messages of
     * other users and can pin messages, channels only
     */
    can_edit_messages?: boolean,

    /**
     * Administrators only. True, if the administrator can delete messages of
     * other users
     */
    can_delete_messages?: boolean,

    /**
     * Administrators only. True, if the administrator can invite new users to
     * the chat
     */
    can_invite_users?: boolean,

    /**
     * Administrators only. True, if the administrator can restrict, ban or
     * unban chat members
     */
    can_restrict_members?: boolean,

    /**
     * Administrators only. True, if the administrator can pin messages,
     * supergroups only
     */
    can_pin_messages?: boolean,

    /**
     * Administrators only. True, if the administrator can add new
     * administrators with a subset of his own privileges or demote
     * administrators that he has promoted, directly or indirectly (promoted by
     * administrators that were appointed by the user)
     */
    can_promote_members?: boolean,

    /**
     * Restricted only. True, if the user can send text messages, contacts,
     * locations and venues
     */
    can_send_messages?: boolean,

    /**
     * Restricted only. True, if the user can send audios, documents, photos,
     * videos, video notes and voice notes, implies can_send_messages
     */
    can_send_media_messages?: boolean,

    /**
     * Restricted only. True, if the user can send animations, games, stickers
     * and use inline bots, implies can_send_media_messages
     */
    can_send_other_messages?: boolean,

    /**
     * Restricted only. True, if user may add web page previews to his
     * messages, implies can_send_media_messages
     */
    can_add_web_page_previews?: boolean,
  };

  /**
   * Contains information about why a request was unsuccessful.
   */
  declare type ResponseParameters = {
    /**
     * The group has been migrated to a supergroup with the specified
     * identifier. This number may be greater than 32 bits and some programming
     * languages may have difficulty/silent defects in interpreting it. But it
     * is smaller than 52 bits, so a signed 64 bit integer or double-precision
     * float type are safe for storing this identifier.
     */
    migrate_to_chat_id?: number,

    /**
     * In case of exceeding flood control, the number of seconds left to wait
     * before the request can be repeated
     */
    retry_after?: number,
  };

  /**
   * Represents a photo to be sent.
   */
  declare type InputMediaPhoto = {
    /**
     * Type of the result, must be photo
     */
    type: string,

    /**
     * File to send. Pass a file_id to send a file that exists on the Telegram
     * servers (recommended), pass an HTTP URL for Telegram to get a file from
     * the Internet, or pass "attach://<file_attach_name>" to upload a new one
     * using multipart/form-data under <file_attach_name> name. More info on
     * Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    media: string,

    /**
     * Caption of the photo to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,
  };

  /**
   * Represents a video to be sent.
   */
  declare type InputMediaVideo = {
    /**
     * Type of the result, must be video
     */
    type: string,

    /**
     * File to send. Pass a file_id to send a file that exists on the Telegram
     * servers (recommended), pass an HTTP URL for Telegram to get a file from
     * the Internet, or pass "attach://<file_attach_name>" to upload a new one
     * using multipart/form-data under <file_attach_name> name. More info on
     * Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    media: string,

    /**
     * Caption of the video to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Video width
     */
    width?: number,

    /**
     * Video height
     */
    height?: number,

    /**
     * Video duration
     */
    duration?: number,

    /**
     * Pass True, if the uploaded video is suitable for streaming
     */
    supports_streaming?: boolean,
  };

  /**
   * Use this method to send text messages. On success, the sent Message is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendMessagePayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Text of the message to be sent
     */
    text: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in your bot's message.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Disables link previews for links in this message
     */
    disable_web_page_preview?: boolean,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method to forward messages of any kind. On success, the sent
   * Message is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type ForwardMessagePayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier for the chat where the original message was sent (or
     * channel username in the format @channelusername)
     */
    from_chat_id: number | string,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * Message identifier in the chat specified in from_chat_id
     */
    message_id: number,
  };

  /**
   * Use this method to send photos. On success, the sent Message is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendPhotoPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Photo to send. Pass a file_id as String to send a photo that exists on
     * the Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a photo from the Internet, or upload a new photo using
     * multipart/form-data. More info on Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    photo: InputFile | string,

    /**
     * Photo caption (may also be used when resending photos by file_id), 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method to send audio files, if you want Telegram clients to
   * display them in the music player. Your audio must be in the .mp3 format.
   * On success, the sent Message is returned. Bots can currently send audio
   * files of up to 50 MB in size, this limit may be changed in the future.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendAudioPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Audio file to send. Pass a file_id as String to send an audio file that
     * exists on the Telegram servers (recommended), pass an HTTP URL as a
     * String for Telegram to get an audio file from the Internet, or upload a
     * new one using multipart/form-data. More info on Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    audio: InputFile | string,

    /**
     * Audio caption, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Duration of the audio in seconds
     */
    duration?: number,

    /**
     * Performer
     */
    performer?: string,

    /**
     * Track name
     */
    title?: string,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method to send general files. On success, the sent Message is
   * returned. Bots can currently send files of any type of up to 50 MB in
   * size, this limit may be changed in the future.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendDocumentPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * File to send. Pass a file_id as String to send a file that exists on the
     * Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a file from the Internet, or upload a new one using
     * multipart/form-data. More info on Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    document: InputFile | string,

    /**
     * Document caption (may also be used when resending documents by file_id),
     * 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method to send video files, Telegram clients support mp4 videos
   * (other formats may be sent as Document). On success, the sent Message is
   * returned. Bots can currently send video files of up to 50 MB in size,
   * this limit may be changed in the future.
   * @see https://core.telegram.org/bots/api#document
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendVideoPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Video to send. Pass a file_id as String to send a video that exists on
     * the Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a video from the Internet, or upload a new video using
     * multipart/form-data. More info on Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    video: InputFile | string,

    /**
     * Duration of sent video in seconds
     */
    duration?: number,

    /**
     * Video width
     */
    width?: number,

    /**
     * Video height
     */
    height?: number,

    /**
     * Video caption (may also be used when resending videos by file_id), 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Pass True, if the uploaded video is suitable for streaming
     */
    supports_streaming?: boolean,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method to send audio files, if you want Telegram clients to
   * display the file as a playable voice message. For this to work, your
   * audio must be in an .ogg file encoded with OPUS (other formats may be
   * sent as Audio or Document). On success, the sent Message is returned.
   * Bots can currently send voice messages of up to 50 MB in size, this
   * limit may be changed in the future.
   * @see https://core.telegram.org/bots/api#audio
   * @see https://core.telegram.org/bots/api#document
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendVoicePayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Audio file to send. Pass a file_id as String to send a file that exists
     * on the Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a file from the Internet, or upload a new one using
     * multipart/form-data. More info on Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    voice: InputFile | string,

    /**
     * Voice message caption, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Duration of the voice message in seconds
     */
    duration?: number,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * As of v.4.0, Telegram clients support rounded square mp4 videos of up to
   * 1 minute long. Use this method to send video messages. On success, the
   * sent Message is returned.
   * @see https://telegram.org/blog/video-messages-and-telescope
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendVideoNotePayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Video note to send. Pass a file_id as String to send a video note that
     * exists on the Telegram servers (recommended) or upload a new video using
     * multipart/form-data. More info on Sending Files ». Sending video notes
     * by a URL is currently unsupported
     * @see https://core.telegram.org/bots/api#sending-files
     */
    video_note: InputFile | string,

    /**
     * Duration of sent video in seconds
     */
    duration?: number,

    /**
     * Video width and height
     */
    length?: number,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method to send a group of photos or videos as an album. On
   * success, an array of the sent Messages is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendMediaGroupPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * A JSON-serialized array describing photos and videos to be sent, must
     * include 2–10 items
     */
    media: InputMedia[],

    /**
     * Sends the messages silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the messages are a reply, ID of the original message
     */
    reply_to_message_id?: number,
  };

  /**
   * Use this method to send point on the map. On success, the sent Message
   * is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendLocationPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Latitude of the location
     */
    latitude: number,

    /**
     * Longitude of the location
     */
    longitude: number,

    /**
     * Period in seconds for which the location will be updated (see Live
     * Locations, should be between 60 and 86400.
     * @see https://telegram.org/blog/live-locations
     */
    live_period?: number,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method to edit live location messages sent by the bot or via
   * the bot (for inline bots). A location can be edited until its
   * live_period expires or editing is explicitly disabled by a call to
   * stopMessageLiveLocation. On success, if the edited message was sent by
   * the bot, the edited Message is returned, otherwise True is returned.
   * @see https://core.telegram.org/bots/api#inline-mode
   * @see https://core.telegram.org/bots/api#stopmessagelivelocation
   * @see https://core.telegram.org/bots/api#message
   */
  declare type EditMessageLiveLocationPayload = {
    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat or username of the target channel (in the format @channelusername)
     */
    chat_id?: number | string,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,

    /**
     * Latitude of new location
     */
    latitude: number,

    /**
     * Longitude of new location
     */
    longitude: number,

    /**
     * A JSON-serialized object for a new inline keyboard.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,
  };

  /**
   * Use this method to stop updating a live location message sent by the bot
   * or via the bot (for inline bots) before live_period expires. On success,
   * if the message was sent by the bot, the sent Message is returned,
   * otherwise True is returned.
   * @see https://core.telegram.org/bots/api#inline-mode
   * @see https://core.telegram.org/bots/api#message
   */
  declare type StopMessageLiveLocationPayload = {
    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat or username of the target channel (in the format @channelusername)
     */
    chat_id?: number | string,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,

    /**
     * A JSON-serialized object for a new inline keyboard.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,
  };

  /**
   * Use this method to send information about a venue. On success, the sent
   * Message is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendVenuePayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Latitude of the venue
     */
    latitude: number,

    /**
     * Longitude of the venue
     */
    longitude: number,

    /**
     * Name of the venue
     */
    title: string,

    /**
     * Address of the venue
     */
    address: string,

    /**
     * Foursquare identifier of the venue
     */
    foursquare_id?: string,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method to send phone contacts. On success, the sent Message is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendContactPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Contact's phone number
     */
    phone_number: string,

    /**
     * Contact's first name
     */
    first_name: string,

    /**
     * Contact's last name
     */
    last_name?: string,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove keyboard or to
     * force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method when you need to tell the user that something is
   * happening on the bot's side. The status is set for 5 seconds or less
   * (when a message arrives from your bot, Telegram clients clear its typing
   * status). Returns True on success.
   */
  declare type SendChatActionPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Type of action to broadcast. Choose one, depending on what the user is
     * about to receive: typing for text messages, upload_photo for photos,
     * record_video or upload_video for videos, record_audio or upload_audio
     * for audio files, upload_document for general files, find_location for
     * location data, record_video_note or upload_video_note for video notes.
     * @see https://core.telegram.org/bots/api#sendmessage
     * @see https://core.telegram.org/bots/api#sendphoto
     * @see https://core.telegram.org/bots/api#sendvideo
     * @see https://core.telegram.org/bots/api#sendaudio
     * @see https://core.telegram.org/bots/api#senddocument
     * @see https://core.telegram.org/bots/api#sendlocation
     * @see https://core.telegram.org/bots/api#sendvideonote
     */
    action: string,
  };

  /**
   * Use this method to get a list of profile pictures for a user. Returns a
   * UserProfilePhotos object.
   * @see https://core.telegram.org/bots/api#userprofilephotos
   */
  declare type GetUserProfilePhotosPayload = {
    /**
     * Unique identifier of the target user
     */
    user_id: number,

    /**
     * Sequential number of the first photo to be returned. By default, all
     * photos are returned.
     */
    offset?: number,

    /**
     * Limits the number of photos to be retrieved. Values between 1—100 are
     * accepted. Defaults to 100.
     */
    limit?: number,
  };

  /**
   * Use this method to get basic info about a file and prepare it for
   * downloading. For the moment, bots can download files of up to 20MB in
   * size. On success, a File object is returned. The file can then be
   * downloaded via the link
   * https://api.telegram.org/file/bot<token>/<file_path>, where <file_path>
   * is taken from the response. It is guaranteed that the link will be valid
   * for at least 1 hour. When the link expires, a new one can be requested
   * by calling getFile again.
   * @see https://core.telegram.org/bots/api#file
   * @see https://core.telegram.org/bots/api#getfile
   */
  declare type GetFilePayload = {
    /**
     * File identifier to get info about
     */
    file_id: string,
  };

  /**
   * Use this method to kick a user from a group, a supergroup or a channel.
   * In the case of supergroups and channels, the user will not be able to
   * return to the group on their own using invite links, etc., unless
   * unbanned first. The bot must be an administrator in the chat for this to
   * work and must have the appropriate admin rights. Returns True on success.
   * @see https://core.telegram.org/bots/api#unbanchatmember
   */
  declare type KickChatMemberPayload = {
    /**
     * Unique identifier for the target group or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,

    /**
     * Date when the user will be unbanned, unix time. If user is banned for
     * more than 366 days or less than 30 seconds from the current time they
     * are considered to be banned forever
     */
    until_date?: number,
  };

  /**
   * Use this method to unban a previously kicked user in a supergroup or
   * channel. The user will not return to the group or channel automatically,
   * but will be able to join via link, etc. The bot must be an administrator
   * for this to work. Returns True on success.
   */
  declare type UnbanChatMemberPayload = {
    /**
     * Unique identifier for the target group or username of the target
     * supergroup or channel (in the format @username)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,
  };

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an
   * administrator in the supergroup for this to work and must have the
   * appropriate admin rights. Pass True for all boolean parameters to lift
   * restrictions from a user. Returns True on success.
   */
  declare type RestrictChatMemberPayload = {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup (in the format @supergroupusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,

    /**
     * Date when restrictions will be lifted for the user, unix time. If user
     * is restricted for more than 366 days or less than 30 seconds from the
     * current time, they are considered to be restricted forever
     */
    until_date?: number,

    /**
     * Pass True, if the user can send text messages, contacts, locations and venues
     */
    can_send_messages?: boolean,

    /**
     * Pass True, if the user can send audios, documents, photos, videos, video
     * notes and voice notes, implies can_send_messages
     */
    can_send_media_messages?: boolean,

    /**
     * Pass True, if the user can send animations, games, stickers and use
     * inline bots, implies can_send_media_messages
     */
    can_send_other_messages?: boolean,

    /**
     * Pass True, if the user may add web page previews to their messages,
     * implies can_send_media_messages
     */
    can_add_web_page_previews?: boolean,
  };

  /**
   * Use this method to promote or demote a user in a supergroup or a
   * channel. The bot must be an administrator in the chat for this to work
   * and must have the appropriate admin rights. Pass False for all boolean
   * parameters to demote a user. Returns True on success.
   */
  declare type PromoteChatMemberPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,

    /**
     * Pass True, if the administrator can change chat title, photo and other settings
     */
    can_change_info?: boolean,

    /**
     * Pass True, if the administrator can create channel posts, channels only
     */
    can_post_messages?: boolean,

    /**
     * Pass True, if the administrator can edit messages of other users and can
     * pin messages, channels only
     */
    can_edit_messages?: boolean,

    /**
     * Pass True, if the administrator can delete messages of other users
     */
    can_delete_messages?: boolean,

    /**
     * Pass True, if the administrator can invite new users to the chat
     */
    can_invite_users?: boolean,

    /**
     * Pass True, if the administrator can restrict, ban or unban chat members
     */
    can_restrict_members?: boolean,

    /**
     * Pass True, if the administrator can pin messages, supergroups only
     */
    can_pin_messages?: boolean,

    /**
     * Pass True, if the administrator can add new administrators with a subset
     * of his own privileges or demote administrators that he has promoted,
     * directly or indirectly (promoted by administrators that were appointed
     * by him)
     */
    can_promote_members?: boolean,
  };

  /**
   * Use this method to generate a new invite link for a chat; any previously
   * generated link is revoked. The bot must be an administrator in the chat
   * for this to work and must have the appropriate admin rights. Returns the
   * new invite link as String on success.
   */
  declare type ExportChatInviteLinkPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,
  };

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be
   * changed for private chats. The bot must be an administrator in the chat
   * for this to work and must have the appropriate admin rights. Returns
   * True on success.
   */
  declare type SetChatPhotoPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * New chat photo, uploaded using multipart/form-data
     */
    photo: InputFile,
  };

  /**
   * Use this method to delete a chat photo. Photos can't be changed for
   * private chats. The bot must be an administrator in the chat for this to
   * work and must have the appropriate admin rights. Returns True on success.
   */
  declare type DeleteChatPhotoPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,
  };

  /**
   * Use this method to change the title of a chat. Titles can't be changed
   * for private chats. The bot must be an administrator in the chat for this
   * to work and must have the appropriate admin rights. Returns True on success.
   */
  declare type SetChatTitlePayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * New chat title, 1-255 characters
     */
    title: string,
  };

  /**
   * Use this method to change the description of a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must
   * have the appropriate admin rights. Returns True on success.
   */
  declare type SetChatDescriptionPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * New chat description, 0-255 characters
     */
    description?: string,
  };

  /**
   * Use this method to pin a message in a supergroup or a channel. The bot
   * must be an administrator in the chat for this to work and must have the
   * ‘can_pin_messages’ admin right in the supergroup or ‘can_edit_messages’
   * admin right in the channel. Returns True on success.
   */
  declare type PinChatMessagePayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Identifier of a message to pin
     */
    message_id: number,

    /**
     * Pass True, if it is not necessary to send a notification to all chat
     * members about the new pinned message. Notifications are always disabled
     * in channels.
     */
    disable_notification?: boolean,
  };

  /**
   * Use this method to unpin a message in a supergroup or a channel. The bot
   * must be an administrator in the chat for this to work and must have the
   * ‘can_pin_messages’ admin right in the supergroup or ‘can_edit_messages’
   * admin right in the channel. Returns True on success.
   */
  declare type UnpinChatMessagePayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,
  };

  /**
   * Use this method for your bot to leave a group, supergroup or channel.
   * Returns True on success.
   */
  declare type LeaveChatPayload = {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,
  };

  /**
   * Use this method to get up to date information about the chat (current
   * name of the user for one-on-one conversations, current username of a
   * user, group or channel, etc.). Returns a Chat object on success.
   * @see https://core.telegram.org/bots/api#chat
   */
  declare type GetChatPayload = {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,
  };

  /**
   * Use this method to get a list of administrators in a chat. On success,
   * returns an Array of ChatMember objects that contains information about
   * all chat administrators except other bots. If the chat is a group or a
   * supergroup and no administrators were appointed, only the creator will
   * be returned.
   * @see https://core.telegram.org/bots/api#chatmember
   */
  declare type GetChatAdministratorsPayload = {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,
  };

  /**
   * Use this method to get the number of members in a chat. Returns Int on success.
   */
  declare type GetChatMembersCountPayload = {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,
  };

  /**
   * Use this method to get information about a member of a chat. Returns a
   * ChatMember object on success.
   * @see https://core.telegram.org/bots/api#chatmember
   */
  declare type GetChatMemberPayload = {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup or channel (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Unique identifier of the target user
     */
    user_id: number,
  };

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot
   * must be an administrator in the chat for this to work and must have the
   * appropriate admin rights. Use the field can_set_sticker_set optionally
   * returned in getChat requests to check if the bot can use this method.
   * Returns True on success.
   * @see https://core.telegram.org/bots/api#getchat
   */
  declare type SetChatStickerSetPayload = {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup (in the format @supergroupusername)
     */
    chat_id: number | string,

    /**
     * Name of the sticker set to be set as the group sticker set
     */
    sticker_set_name: string,
  };

  /**
   * Use this method to delete a group sticker set from a supergroup. The bot
   * must be an administrator in the chat for this to work and must have the
   * appropriate admin rights. Use the field can_set_sticker_set optionally
   * returned in getChat requests to check if the bot can use this method.
   * Returns True on success.
   * @see https://core.telegram.org/bots/api#getchat
   */
  declare type DeleteChatStickerSetPayload = {
    /**
     * Unique identifier for the target chat or username of the target
     * supergroup (in the format @supergroupusername)
     */
    chat_id: number | string,
  };

  /**
   * Use this method to send answers to callback queries sent from inline
   * keyboards. The answer will be displayed to the user as a notification at
   * the top of the chat screen or as an alert. On success, True is returned.
   * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
   */
  declare type AnswerCallbackQueryPayload = {
    /**
     * Unique identifier for the query to be answered
     */
    callback_query_id: string,

    /**
     * Text of the notification. If not specified, nothing will be shown to the
     * user, 0-200 characters
     */
    text?: string,

    /**
     * If true, an alert will be shown by the client instead of a notification
     * at the top of the chat screen. Defaults to false.
     */
    show_alert?: boolean,

    /**
     * URL that will be opened by the user's client. If you have created a Game
     * and accepted the conditions via @Botfather, specify the URL that opens
     * your game – note that this will only work if the query comes from a
     * callback_game button.Otherwise, you may use links like
     * t.me/your_bot?start=XXXX that open your bot with a parameter.
     * @see https://core.telegram.org/bots/api#game
     * @see https://t.me/botfather
     * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
     */
    url?: string,

    /**
     * The maximum amount of time in seconds that the result of the callback
     * query may be cached client-side. Telegram apps will support caching
     * starting in version 3.14. Defaults to 0.
     */
    cache_time?: number,
  };

  /**
   * Use this method to edit text and game messages sent by the bot or via
   * the bot (for inline bots). On success, if edited message is sent by the
   * bot, the edited Message is returned, otherwise True is returned.
   * @see https://core.telegram.org/bots/api#games
   * @see https://core.telegram.org/bots/api#inline-mode
   * @see https://core.telegram.org/bots/api#message
   */
  declare type EditMessageTextPayload = {
    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat or username of the target channel (in the format @channelusername)
     */
    chat_id?: number | string,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,

    /**
     * New text of the message
     */
    text: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in your bot's message.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Disables link previews for links in this message
     */
    disable_web_page_preview?: boolean,

    /**
     * A JSON-serialized object for an inline keyboard.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,
  };

  /**
   * Use this method to edit captions of messages sent by the bot or via the
   * bot (for inline bots). On success, if edited message is sent by the bot,
   * the edited Message is returned, otherwise True is returned.
   * @see https://core.telegram.org/bots/api#inline-mode
   * @see https://core.telegram.org/bots/api#message
   */
  declare type EditMessageCaptionPayload = {
    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat or username of the target channel (in the format @channelusername)
     */
    chat_id?: number | string,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,

    /**
     * New caption of the message
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * A JSON-serialized object for an inline keyboard.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,
  };

  /**
   * Use this method to edit only the reply markup of messages sent by the
   * bot or via the bot (for inline bots).  On success, if edited message is
   * sent by the bot, the edited Message is returned, otherwise True is returned.
   * @see https://core.telegram.org/bots/api#inline-mode
   * @see https://core.telegram.org/bots/api#message
   */
  declare type EditMessageReplyMarkupPayload = {
    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat or username of the target channel (in the format @channelusername)
     */
    chat_id?: number | string,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,

    /**
     * A JSON-serialized object for an inline keyboard.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,
  };

  /**
   * Use this method to delete a message, including service messages, with
   * the following limitations:- A message can only be deleted if it was sent
   * less than 48 hours ago.- Bots can delete outgoing messages in groups and
   * supergroups.- Bots granted can_post_messages permissions can delete
   * outgoing messages in channels.- If the bot is an administrator of a
   * group, it can delete any message there.- If the bot has
   * can_delete_messages permission in a supergroup or a channel, it can
   * delete any message there.Returns True on success.
   */
  declare type DeleteMessagePayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Identifier of the message to delete
     */
    message_id: number,
  };

  /**
   * This object represents a sticker.
   */
  declare type Sticker = {
    /**
     * Unique identifier for this file
     */
    file_id: string,

    /**
     * Sticker width
     */
    width: number,

    /**
     * Sticker height
     */
    height: number,

    /**
     * Sticker thumbnail in the .webp or .jpg format
     */
    thumb?: PhotoSize,

    /**
     * Emoji associated with the sticker
     */
    emoji?: string,

    /**
     * Name of the sticker set to which the sticker belongs
     */
    set_name?: string,

    /**
     * For mask stickers, the position where the mask should be placed
     */
    mask_position?: MaskPosition,

    /**
     * File size
     */
    file_size?: number,
  };

  /**
   * This object represents a sticker set.
   */
  declare type StickerSet = {
    /**
     * Sticker set name
     */
    name: string,

    /**
     * Sticker set title
     */
    title: string,

    /**
     * True, if the sticker set contains masks
     */
    contains_masks: boolean,

    /**
     * List of all set stickers
     */
    stickers: Sticker[],
  };

  /**
   * This object describes the position on faces where a mask should be
   * placed by default.
   */
  declare type MaskPosition = {
    /**
     * The part of the face relative to which the mask should be placed. One of
     * “forehead”, “eyes”, “mouth”, or “chin”.
     */
    point: string,

    /**
     * Shift by X-axis measured in widths of the mask scaled to the face size,
     * from left to right. For example, choosing -1.0 will place mask just to
     * the left of the default mask position.
     */
    x_shift: number,

    /**
     * Shift by Y-axis measured in heights of the mask scaled to the face size,
     * from top to bottom. For example, 1.0 will place the mask just below the
     * default mask position.
     */
    y_shift: number,

    /**
     * Mask scaling coefficient. For example, 2.0 means double size.
     */
    scale: number,
  };

  /**
   * Use this method to send .webp stickers. On success, the sent Message is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendStickerPayload = {
    /**
     * Unique identifier for the target chat or username of the target channel
     * (in the format @channelusername)
     */
    chat_id: number | string,

    /**
     * Sticker to send. Pass a file_id as String to send a file that exists on
     * the Telegram servers (recommended), pass an HTTP URL as a String for
     * Telegram to get a .webp file from the Internet, or upload a new one
     * using multipart/form-data. More info on Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    sticker: InputFile | string,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * Additional interface options. A JSON-serialized object for an inline
     * keyboard, custom reply keyboard, instructions to remove reply keyboard
     * or to force a reply from the user.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     * @see https://core.telegram.org/bots#keyboards
     */
    reply_markup?:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  };

  /**
   * Use this method to get a sticker set. On success, a StickerSet object is returned.
   * @see https://core.telegram.org/bots/api#stickerset
   */
  declare type GetStickerSetPayload = {
    /**
     * Name of the sticker set
     */
    name: string,
  };

  /**
   * Use this method to upload a .png file with a sticker for later use in
   * createNewStickerSet and addStickerToSet methods (can be used multiple
   * times). Returns the uploaded File on success.
   * @see https://core.telegram.org/bots/api#file
   */
  declare type UploadStickerFilePayload = {
    /**
     * User identifier of sticker file owner
     */
    user_id: number,

    /**
     * Png image with the sticker, must be up to 512 kilobytes in size,
     * dimensions must not exceed 512px, and either width or height must be
     * exactly 512px. More info on Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    png_sticker: InputFile,
  };

  /**
   * Use this method to create new sticker set owned by a user. The bot will
   * be able to edit the created sticker set. Returns True on success.
   */
  declare type CreateNewStickerSetPayload = {
    /**
     * User identifier of created sticker set owner
     */
    user_id: number,

    /**
     * Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g.,
     * animals). Can contain only english letters, digits and underscores. Must
     * begin with a letter, can't contain consecutive underscores and must end
     * in “_by_<bot username>”. <bot_username> is case insensitive. 1-64 characters.
     */
    name: string,

    /**
     * Sticker set title, 1-64 characters
     */
    title: string,

    /**
     * Png image with the sticker, must be up to 512 kilobytes in size,
     * dimensions must not exceed 512px, and either width or height must be
     * exactly 512px. Pass a file_id as a String to send a file that already
     * exists on the Telegram servers, pass an HTTP URL as a String for
     * Telegram to get a file from the Internet, or upload a new one using
     * multipart/form-data. More info on Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    png_sticker: InputFile | string,

    /**
     * One or more emoji corresponding to the sticker
     */
    emojis: string,

    /**
     * Pass True, if a set of mask stickers should be created
     */
    contains_masks?: boolean,

    /**
     * A JSON-serialized object for position where the mask should be placed on faces
     */
    mask_position?: MaskPosition,
  };

  /**
   * Use this method to add a new sticker to a set created by the bot.
   * Returns True on success.
   */
  declare type AddStickerToSetPayload = {
    /**
     * User identifier of sticker set owner
     */
    user_id: number,

    /**
     * Sticker set name
     */
    name: string,

    /**
     * Png image with the sticker, must be up to 512 kilobytes in size,
     * dimensions must not exceed 512px, and either width or height must be
     * exactly 512px. Pass a file_id as a String to send a file that already
     * exists on the Telegram servers, pass an HTTP URL as a String for
     * Telegram to get a file from the Internet, or upload a new one using
     * multipart/form-data. More info on Sending Files »
     * @see https://core.telegram.org/bots/api#sending-files
     */
    png_sticker: InputFile | string,

    /**
     * One or more emoji corresponding to the sticker
     */
    emojis: string,

    /**
     * A JSON-serialized object for position where the mask should be placed on faces
     */
    mask_position?: MaskPosition,
  };

  /**
   * Use this method to move a sticker in a set created by the bot to a
   * specific position . Returns True on success.
   */
  declare type SetStickerPositionInSetPayload = {
    /**
     * File identifier of the sticker
     */
    sticker: string,

    /**
     * New sticker position in the set, zero-based
     */
    position: number,
  };

  /**
   * Use this method to delete a sticker from a set created by the bot.
   * Returns True on success.
   */
  declare type DeleteStickerFromSetPayload = {
    /**
     * File identifier of the sticker
     */
    sticker: string,
  };

  /**
   * This object represents an incoming inline query. When the user sends an
   * empty query, your bot could return some default or trending results.
   */
  declare type InlineQuery = {
    /**
     * Unique identifier for this query
     */
    id: string,

    /**
     * Sender
     */
    from: User,

    /**
     * Sender location, only for bots that request user location
     */
    location?: Location,

    /**
     * Text of the query (up to 512 characters)
     */
    query: string,

    /**
     * Offset of the results to be returned, can be controlled by the bot
     */
    offset: string,
  };

  /**
   * Use this method to send answers to an inline query. On success, True is
   * returned.No more than 50 results per query are allowed.
   */
  declare type AnswerInlineQueryPayload = {
    /**
     * Unique identifier for the answered query
     */
    inline_query_id: string,

    /**
     * A JSON-serialized array of results for the inline query
     */
    results: InlineQueryResult[],

    /**
     * The maximum amount of time in seconds that the result of the inline
     * query may be cached on the server. Defaults to 300.
     */
    cache_time?: number,

    /**
     * Pass True, if results may be cached on the server side only for the user
     * that sent the query. By default, results may be returned to any user who
     * sends the same query
     */
    is_personal?: boolean,

    /**
     * Pass the offset that a client should send in the next query with the
     * same text to receive more results. Pass an empty string if there are no
     * more results or if you don‘t support pagination. Offset length can’t
     * exceed 64 bytes.
     */
    next_offset?: string,

    /**
     * If passed, clients will display a button with specified text that
     * switches the user to a private chat with the bot and sends the bot a
     * start message with the parameter switch_pm_parameter
     */
    switch_pm_text?: string,

    /**
     * Deep-linking parameter for the /start message sent to the bot when user
     * presses the switch button. 1-64 characters, only A-Z, a-z, 0-9, _ and -
     * are allowed.Example: An inline bot that sends YouTube videos can ask the
     * user to connect the bot to their YouTube account to adapt search results
     * accordingly. To do this, it displays a ‘Connect your YouTube account’
     * button above the results, or even before showing any. The user presses
     * the button, switches to a private chat with the bot and, in doing so,
     * passes a start parameter that instructs the bot to return an oauth link.
     * Once done, the bot can offer a switch_inline button so that the user can
     * easily return to the chat where they wanted to use the bot's inline capabilities.
     * @see https://core.telegram.org/bots/api/bots#deep-linking
     * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
     */
    switch_pm_parameter?: string,
  };

  /**
   * Represents a link to an article or web page.
   */
  declare type InlineQueryResultArticle = {
    /**
     * Type of the result, must be article
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 Bytes
     */
    id: string,

    /**
     * Title of the result
     */
    title: string,

    /**
     * Content of the message to be sent
     */
    input_message_content: InputMessageContent,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * URL of the result
     */
    url?: string,

    /**
     * Pass True, if you don't want the URL to be shown in the message
     */
    hide_url?: boolean,

    /**
     * Short description of the result
     */
    description?: string,

    /**
     * Url of the thumbnail for the result
     */
    thumb_url?: string,

    /**
     * Thumbnail width
     */
    thumb_width?: number,

    /**
     * Thumbnail height
     */
    thumb_height?: number,
  };

  /**
   * Represents a link to a photo. By default, this photo will be sent by the
   * user with optional caption. Alternatively, you can use
   * input_message_content to send a message with the specified content
   * instead of the photo.
   */
  declare type InlineQueryResultPhoto = {
    /**
     * Type of the result, must be photo
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid URL of the photo. Photo must be in jpeg format. Photo size must
     * not exceed 5MB
     */
    photo_url: string,

    /**
     * URL of the thumbnail for the photo
     */
    thumb_url: string,

    /**
     * Width of the photo
     */
    photo_width?: number,

    /**
     * Height of the photo
     */
    photo_height?: number,

    /**
     * Title for the result
     */
    title?: string,

    /**
     * Short description of the result
     */
    description?: string,

    /**
     * Caption of the photo to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the photo
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to an animated GIF file. By default, this animated GIF
   * file will be sent by the user with optional caption. Alternatively, you
   * can use input_message_content to send a message with the specified
   * content instead of the animation.
   */
  declare type InlineQueryResultGif = {
    /**
     * Type of the result, must be gif
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid URL for the GIF file. File size must not exceed 1MB
     */
    gif_url: string,

    /**
     * Width of the GIF
     */
    gif_width?: number,

    /**
     * Height of the GIF
     */
    gif_height?: number,

    /**
     * Duration of the GIF
     */
    gif_duration?: number,

    /**
     * URL of the static thumbnail for the result (jpeg or gif)
     */
    thumb_url: string,

    /**
     * Title for the result
     */
    title?: string,

    /**
     * Caption of the GIF file to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the GIF animation
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to a video animation (H.264/MPEG-4 AVC video without
   * sound). By default, this animated MPEG-4 file will be sent by the user
   * with optional caption. Alternatively, you can use input_message_content
   * to send a message with the specified content instead of the animation.
   */
  declare type InlineQueryResultMpeg4Gif = {
    /**
     * Type of the result, must be mpeg4_gif
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid URL for the MP4 file. File size must not exceed 1MB
     */
    mpeg4_url: string,

    /**
     * Video width
     */
    mpeg4_width?: number,

    /**
     * Video height
     */
    mpeg4_height?: number,

    /**
     * Video duration
     */
    mpeg4_duration?: number,

    /**
     * URL of the static thumbnail (jpeg or gif) for the result
     */
    thumb_url: string,

    /**
     * Title for the result
     */
    title?: string,

    /**
     * Caption of the MPEG-4 file to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the video animation
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to a page containing an embedded video player or a
   * video file. By default, this video file will be sent by the user with an
   * optional caption. Alternatively, you can use input_message_content to
   * send a message with the specified content instead of the video.
   */
  declare type InlineQueryResultVideo = {
    /**
     * Type of the result, must be video
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid URL for the embedded video player or video file
     */
    video_url: string,

    /**
     * Mime type of the content of video url, “text/html” or “video/mp4”
     */
    mime_type: string,

    /**
     * URL of the thumbnail (jpeg only) for the video
     */
    thumb_url: string,

    /**
     * Title for the result
     */
    title: string,

    /**
     * Caption of the video to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Video width
     */
    video_width?: number,

    /**
     * Video height
     */
    video_height?: number,

    /**
     * Video duration in seconds
     */
    video_duration?: number,

    /**
     * Short description of the result
     */
    description?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the video. This field is
     * required if InlineQueryResultVideo is used to send an HTML-page as a
     * result (e.g., a YouTube video).
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to an mp3 audio file. By default, this audio file will
   * be sent by the user. Alternatively, you can use input_message_content to
   * send a message with the specified content instead of the audio.
   */
  declare type InlineQueryResultAudio = {
    /**
     * Type of the result, must be audio
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid URL for the audio file
     */
    audio_url: string,

    /**
     * Title
     */
    title: string,

    /**
     * Caption, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Performer
     */
    performer?: string,

    /**
     * Audio duration in seconds
     */
    audio_duration?: number,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the audio
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to a voice recording in an .ogg container encoded with
   * OPUS. By default, this voice recording will be sent by the user.
   * Alternatively, you can use input_message_content to send a message with
   * the specified content instead of the the voice message.
   */
  declare type InlineQueryResultVoice = {
    /**
     * Type of the result, must be voice
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid URL for the voice recording
     */
    voice_url: string,

    /**
     * Recording title
     */
    title: string,

    /**
     * Caption, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Recording duration in seconds
     */
    voice_duration?: number,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the voice recording
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to a file. By default, this file will be sent by the
   * user with an optional caption. Alternatively, you can use
   * input_message_content to send a message with the specified content
   * instead of the file. Currently, only .PDF and .ZIP files can be sent
   * using this method.
   */
  declare type InlineQueryResultDocument = {
    /**
     * Type of the result, must be document
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * Title for the result
     */
    title: string,

    /**
     * Caption of the document to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * A valid URL for the file
     */
    document_url: string,

    /**
     * Mime type of the content of the file, either “application/pdf” or “application/zip”
     */
    mime_type: string,

    /**
     * Short description of the result
     */
    description?: string,

    /**
     * Inline keyboard attached to the message
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the file
     */
    input_message_content?: InputMessageContent,

    /**
     * URL of the thumbnail (jpeg only) for the file
     */
    thumb_url?: string,

    /**
     * Thumbnail width
     */
    thumb_width?: number,

    /**
     * Thumbnail height
     */
    thumb_height?: number,
  };

  /**
   * Represents a location on a map. By default, the location will be sent by
   * the user. Alternatively, you can use input_message_content to send a
   * message with the specified content instead of the location.
   */
  declare type InlineQueryResultLocation = {
    /**
     * Type of the result, must be location
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 Bytes
     */
    id: string,

    /**
     * Location latitude in degrees
     */
    latitude: number,

    /**
     * Location longitude in degrees
     */
    longitude: number,

    /**
     * Location title
     */
    title: string,

    /**
     * Period in seconds for which the location can be updated, should be
     * between 60 and 86400.
     */
    live_period?: number,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the location
     */
    input_message_content?: InputMessageContent,

    /**
     * Url of the thumbnail for the result
     */
    thumb_url?: string,

    /**
     * Thumbnail width
     */
    thumb_width?: number,

    /**
     * Thumbnail height
     */
    thumb_height?: number,
  };

  /**
   * Represents a venue. By default, the venue will be sent by the user.
   * Alternatively, you can use input_message_content to send a message with
   * the specified content instead of the venue.
   */
  declare type InlineQueryResultVenue = {
    /**
     * Type of the result, must be venue
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 Bytes
     */
    id: string,

    /**
     * Latitude of the venue location in degrees
     */
    latitude: number,

    /**
     * Longitude of the venue location in degrees
     */
    longitude: number,

    /**
     * Title of the venue
     */
    title: string,

    /**
     * Address of the venue
     */
    address: string,

    /**
     * Foursquare identifier of the venue if known
     */
    foursquare_id?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the venue
     */
    input_message_content?: InputMessageContent,

    /**
     * Url of the thumbnail for the result
     */
    thumb_url?: string,

    /**
     * Thumbnail width
     */
    thumb_width?: number,

    /**
     * Thumbnail height
     */
    thumb_height?: number,
  };

  /**
   * Represents a contact with a phone number. By default, this contact will
   * be sent by the user. Alternatively, you can use input_message_content to
   * send a message with the specified content instead of the contact.
   */
  declare type InlineQueryResultContact = {
    /**
     * Type of the result, must be contact
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 Bytes
     */
    id: string,

    /**
     * Contact's phone number
     */
    phone_number: string,

    /**
     * Contact's first name
     */
    first_name: string,

    /**
     * Contact's last name
     */
    last_name?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the contact
     */
    input_message_content?: InputMessageContent,

    /**
     * Url of the thumbnail for the result
     */
    thumb_url?: string,

    /**
     * Thumbnail width
     */
    thumb_width?: number,

    /**
     * Thumbnail height
     */
    thumb_height?: number,
  };

  /**
   * Represents a Game.
   * @see https://core.telegram.org/bots/api#games
   */
  declare type InlineQueryResultGame = {
    /**
     * Type of the result, must be game
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * Short name of the game
     */
    game_short_name: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,
  };

  /**
   * Represents a link to a photo stored on the Telegram servers. By default,
   * this photo will be sent by the user with an optional caption.
   * Alternatively, you can use input_message_content to send a message with
   * the specified content instead of the photo.
   */
  declare type InlineQueryResultCachedPhoto = {
    /**
     * Type of the result, must be photo
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid file identifier of the photo
     */
    photo_file_id: string,

    /**
     * Title for the result
     */
    title?: string,

    /**
     * Short description of the result
     */
    description?: string,

    /**
     * Caption of the photo to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the photo
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to an animated GIF file stored on the Telegram
   * servers. By default, this animated GIF file will be sent by the user
   * with an optional caption. Alternatively, you can use
   * input_message_content to send a message with specified content instead
   * of the animation.
   */
  declare type InlineQueryResultCachedGif = {
    /**
     * Type of the result, must be gif
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid file identifier for the GIF file
     */
    gif_file_id: string,

    /**
     * Title for the result
     */
    title?: string,

    /**
     * Caption of the GIF file to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the GIF animation
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to a video animation (H.264/MPEG-4 AVC video without
   * sound) stored on the Telegram servers. By default, this animated MPEG-4
   * file will be sent by the user with an optional caption. Alternatively,
   * you can use input_message_content to send a message with the specified
   * content instead of the animation.
   */
  declare type InlineQueryResultCachedMpeg4Gif = {
    /**
     * Type of the result, must be mpeg4_gif
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid file identifier for the MP4 file
     */
    mpeg4_file_id: string,

    /**
     * Title for the result
     */
    title?: string,

    /**
     * Caption of the MPEG-4 file to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the video animation
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to a sticker stored on the Telegram servers. By
   * default, this sticker will be sent by the user. Alternatively, you can
   * use input_message_content to send a message with the specified content
   * instead of the sticker.
   */
  declare type InlineQueryResultCachedSticker = {
    /**
     * Type of the result, must be sticker
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid file identifier of the sticker
     */
    sticker_file_id: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the sticker
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to a file stored on the Telegram servers. By default,
   * this file will be sent by the user with an optional caption.
   * Alternatively, you can use input_message_content to send a message with
   * the specified content instead of the file.
   */
  declare type InlineQueryResultCachedDocument = {
    /**
     * Type of the result, must be document
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * Title for the result
     */
    title: string,

    /**
     * A valid file identifier for the file
     */
    document_file_id: string,

    /**
     * Short description of the result
     */
    description?: string,

    /**
     * Caption of the document to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the file
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to a video file stored on the Telegram servers. By
   * default, this video file will be sent by the user with an optional
   * caption. Alternatively, you can use input_message_content to send a
   * message with the specified content instead of the video.
   */
  declare type InlineQueryResultCachedVideo = {
    /**
     * Type of the result, must be video
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid file identifier for the video file
     */
    video_file_id: string,

    /**
     * Title for the result
     */
    title: string,

    /**
     * Short description of the result
     */
    description?: string,

    /**
     * Caption of the video to be sent, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the video
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to a voice message stored on the Telegram servers. By
   * default, this voice message will be sent by the user. Alternatively, you
   * can use input_message_content to send a message with the specified
   * content instead of the voice message.
   */
  declare type InlineQueryResultCachedVoice = {
    /**
     * Type of the result, must be voice
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid file identifier for the voice message
     */
    voice_file_id: string,

    /**
     * Voice message title
     */
    title: string,

    /**
     * Caption, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the voice message
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents a link to an mp3 audio file stored on the Telegram servers.
   * By default, this audio file will be sent by the user. Alternatively, you
   * can use input_message_content to send a message with the specified
   * content instead of the audio.
   */
  declare type InlineQueryResultCachedAudio = {
    /**
     * Type of the result, must be audio
     */
    type: string,

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string,

    /**
     * A valid file identifier for the audio file
     */
    audio_file_id: string,

    /**
     * Caption, 0-200 characters
     */
    caption?: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in the media caption.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Inline keyboard attached to the message
     * @see https://core.telegram.org/bots/api/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,

    /**
     * Content of the message to be sent instead of the audio
     */
    input_message_content?: InputMessageContent,
  };

  /**
   * Represents the content of a text message to be sent as the result of an
   * inline query.
   * @see https://core.telegram.org/bots/api#inputmessagecontent
   */
  declare type InputTextMessageContent = {
    /**
     * Text of the message to be sent, 1-4096 characters
     */
    message_text: string,

    /**
     * Send Markdown or HTML, if you want Telegram apps to show bold, italic,
     * fixed-width text or inline URLs in your bot's message.
     * @see https://core.telegram.org/bots/api#markdown-style
     * @see https://core.telegram.org/bots/api#html-style
     * @see https://core.telegram.org/bots/api#formatting-options
     */
    parse_mode?: string,

    /**
     * Disables link previews for links in the sent message
     */
    disable_web_page_preview?: boolean,
  };

  /**
   * Represents the content of a location message to be sent as the result of
   * an inline query.
   * @see https://core.telegram.org/bots/api#inputmessagecontent
   */
  declare type InputLocationMessageContent = {
    /**
     * Latitude of the location in degrees
     */
    latitude: number,

    /**
     * Longitude of the location in degrees
     */
    longitude: number,

    /**
     * Period in seconds for which the location can be updated, should be
     * between 60 and 86400.
     */
    live_period?: number,
  };

  /**
   * Represents the content of a venue message to be sent as the result of an
   * inline query.
   * @see https://core.telegram.org/bots/api#inputmessagecontent
   */
  declare type InputVenueMessageContent = {
    /**
     * Latitude of the venue in degrees
     */
    latitude: number,

    /**
     * Longitude of the venue in degrees
     */
    longitude: number,

    /**
     * Name of the venue
     */
    title: string,

    /**
     * Address of the venue
     */
    address: string,

    /**
     * Foursquare identifier of the venue, if known
     */
    foursquare_id?: string,
  };

  /**
   * Represents the content of a contact message to be sent as the result of
   * an inline query.
   * @see https://core.telegram.org/bots/api#inputmessagecontent
   */
  declare type InputContactMessageContent = {
    /**
     * Contact's phone number
     */
    phone_number: string,

    /**
     * Contact's first name
     */
    first_name: string,

    /**
     * Contact's last name
     */
    last_name?: string,
  };

  /**
   * Represents a result of an inline query that was chosen by the user and
   * sent to their chat partner.
   * @see https://core.telegram.org/bots/api#inlinequeryresult
   */
  declare type ChosenInlineResult = {
    /**
     * The unique identifier for the result that was chosen
     */
    result_id: string,

    /**
     * The user that chose the result
     */
    from: User,

    /**
     * Sender location, only for bots that require user location
     */
    location?: Location,

    /**
     * Identifier of the sent inline message. Available only if there is an
     * inline keyboard attached to the message. Will be also received in
     * callback queries and can be used to edit the message.
     * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
     * @see https://core.telegram.org/bots/api#callbackquery
     * @see https://core.telegram.org/bots/api#updating-messages
     */
    inline_message_id?: string,

    /**
     * The query that was used to obtain the result
     */
    query: string,
  };

  /**
   * Use this method to send invoices. On success, the sent Message is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendInvoicePayload = {
    /**
     * Unique identifier for the target private chat
     */
    chat_id: number,

    /**
     * Product name, 1-32 characters
     */
    title: string,

    /**
     * Product description, 1-255 characters
     */
    description: string,

    /**
     * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to
     * the user, use for your internal processes.
     */
    payload: string,

    /**
     * Payments provider token, obtained via Botfather
     * @see https://t.me/botfather
     */
    provider_token: string,

    /**
     * Unique deep-linking parameter that can be used to generate this invoice
     * when used as a start parameter
     */
    start_parameter: string,

    /**
     * Three-letter ISO 4217 currency code, see more on currencies
     * @see https://core.telegram.org/bots/api/bots/payments#supported-currencies
     */
    currency: string,

    /**
     * Price breakdown, a list of components (e.g. product price, tax,
     * discount, delivery cost, delivery tax, bonus, etc.)
     */
    prices: LabeledPrice[],

    /**
     * JSON-encoded data about the invoice, which will be shared with the
     * payment provider. A detailed description of required fields should be
     * provided by the payment provider.
     */
    provider_data?: string,

    /**
     * URL of the product photo for the invoice. Can be a photo of the goods or
     * a marketing image for a service. People like it better when they see
     * what they are paying for.
     */
    photo_url?: string,

    /**
     * Photo size
     */
    photo_size?: number,

    /**
     * Photo width
     */
    photo_width?: number,

    /**
     * Photo height
     */
    photo_height?: number,

    /**
     * Pass True, if you require the user's full name to complete the order
     */
    need_name?: boolean,

    /**
     * Pass True, if you require the user's phone number to complete the order
     */
    need_phone_number?: boolean,

    /**
     * Pass True, if you require the user's email address to complete the order
     */
    need_email?: boolean,

    /**
     * Pass True, if you require the user's shipping address to complete the order
     */
    need_shipping_address?: boolean,

    /**
     * Pass True, if user's phone number should be sent to provider
     */
    send_phone_number_to_provider?: boolean,

    /**
     * Pass True, if user's email address should be sent to provider
     */
    send_email_to_provider?: boolean,

    /**
     * Pass True, if the final price depends on the shipping method
     */
    is_flexible?: boolean,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * A JSON-serialized object for an inline keyboard. If empty, one 'Pay
     * total price' button will be shown. If not empty, the first button must
     * be a Pay button.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,
  };

  /**
   * If you sent an invoice requesting a shipping address and the parameter
   * is_flexible was specified, the Bot API will send an Update with a
   * shipping_query field to the bot. Use this method to reply to shipping
   * queries. On success, True is returned.
   * @see https://core.telegram.org/bots/api#update
   */
  declare type AnswerShippingQueryPayload = {
    /**
     * Unique identifier for the query to be answered
     */
    shipping_query_id: string,

    /**
     * Specify True if delivery to the specified address is possible and False
     * if there are any problems (for example, if delivery to the specified
     * address is not possible)
     */
    ok: boolean,

    /**
     * Required if ok is True. A JSON-serialized array of available shipping options.
     */
    shipping_options?: ShippingOption[],

    /**
     * Required if ok is False. Error message in human readable form that
     * explains why it is impossible to complete the order (e.g. "Sorry,
     * delivery to your desired address is unavailable'). Telegram will display
     * this message to the user.
     */
    error_message?: string,
  };

  /**
   * Once the user has confirmed their payment and shipping details, the Bot
   * API sends the final confirmation in the form of an Update with the field
   * pre_checkout_query. Use this method to respond to such pre-checkout
   * queries. On success, True is returned. Note: The Bot API must receive an
   * answer within 10 seconds after the pre-checkout query was sent.
   * @see https://core.telegram.org/bots/api#update
   */
  declare type AnswerPreCheckoutQueryPayload = {
    /**
     * Unique identifier for the query to be answered
     */
    pre_checkout_query_id: string,

    /**
     * Specify True if everything is alright (goods are available, etc.) and
     * the bot is ready to proceed with the order. Use False if there are any problems.
     */
    ok: boolean,

    /**
     * Required if ok is False. Error message in human readable form that
     * explains the reason for failure to proceed with the checkout (e.g.
     * "Sorry, somebody just bought the last of our amazing black T-shirts
     * while you were busy filling out your payment details. Please choose a
     * different color or garment!"). Telegram will display this message to the user.
     */
    error_message?: string,
  };

  /**
   * This object represents a portion of the price for goods or services.
   */
  declare type LabeledPrice = {
    /**
     * Portion label
     */
    label: string,

    /**
     * Price of the product in the smallest units of the currency (integer, not
     * float/double). For example, for a price of US$ 1.45 pass amount = 145.
     * See the exp parameter in currencies.json, it shows the number of digits
     * past the decimal point for each currency (2 for the majority of currencies).
     * @see https://core.telegram.org/bots/api/bots/payments#supported-currencies
     * @see https://core.telegram.org/bots/payments/currencies.json
     */
    amount: number,
  };

  /**
   * This object contains basic information about an invoice.
   */
  declare type Invoice = {
    /**
     * Product name
     */
    title: string,

    /**
     * Product description
     */
    description: string,

    /**
     * Unique bot deep-linking parameter that can be used to generate this invoice
     */
    start_parameter: string,

    /**
     * Three-letter ISO 4217 currency code
     * @see https://core.telegram.org/bots/api/bots/payments#supported-currencies
     */
    currency: string,

    /**
     * Total price in the smallest units of the currency (integer, not
     * float/double). For example, for a price of US$ 1.45 pass amount = 145.
     * See the exp parameter in currencies.json, it shows the number of digits
     * past the decimal point for each currency (2 for the majority of currencies).
     * @see https://core.telegram.org/bots/payments/currencies.json
     */
    total_amount: number,
  };

  /**
   * This object represents a shipping address.
   */
  declare type ShippingAddress = {
    /**
     * ISO 3166-1 alpha-2 country code
     */
    country_code: string,

    /**
     * State, if applicable
     */
    state: string,

    /**
     * City
     */
    city: string,

    /**
     * First line for the address
     */
    street_line1: string,

    /**
     * Second line for the address
     */
    street_line2: string,

    /**
     * Address post code
     */
    post_code: string,
  };

  /**
   * This object represents information about an order.
   */
  declare type OrderInfo = {
    /**
     * User name
     */
    name?: string,

    /**
     * User's phone number
     */
    phone_number?: string,

    /**
     * User email
     */
    email?: string,

    /**
     * User shipping address
     */
    shipping_address?: ShippingAddress,
  };

  /**
   * This object represents one shipping option.
   */
  declare type ShippingOption = {
    /**
     * Shipping option identifier
     */
    id: string,

    /**
     * Option title
     */
    title: string,

    /**
     * List of price portions
     */
    prices: LabeledPrice[],
  };

  /**
   * This object contains basic information about a successful payment.
   */
  declare type SuccessfulPayment = {
    /**
     * Three-letter ISO 4217 currency code
     * @see https://core.telegram.org/bots/api/bots/payments#supported-currencies
     */
    currency: string,

    /**
     * Total price in the smallest units of the currency (integer, not
     * float/double). For example, for a price of US$ 1.45 pass amount = 145.
     * See the exp parameter in currencies.json, it shows the number of digits
     * past the decimal point for each currency (2 for the majority of currencies).
     * @see https://core.telegram.org/bots/payments/currencies.json
     */
    total_amount: number,

    /**
     * Bot specified invoice payload
     */
    invoice_payload: string,

    /**
     * Identifier of the shipping option chosen by the user
     */
    shipping_option_id?: string,

    /**
     * Order info provided by the user
     */
    order_info?: OrderInfo,

    /**
     * Telegram payment identifier
     */
    telegram_payment_charge_id: string,

    /**
     * Provider payment identifier
     */
    provider_payment_charge_id: string,
  };

  /**
   * This object contains information about an incoming shipping query.
   */
  declare type ShippingQuery = {
    /**
     * Unique query identifier
     */
    id: string,

    /**
     * User who sent the query
     */
    from: User,

    /**
     * Bot specified invoice payload
     */
    invoice_payload: string,

    /**
     * User specified shipping address
     */
    shipping_address: ShippingAddress,
  };

  /**
   * This object contains information about an incoming pre-checkout query.
   */
  declare type PreCheckoutQuery = {
    /**
     * Unique query identifier
     */
    id: string,

    /**
     * User who sent the query
     */
    from: User,

    /**
     * Three-letter ISO 4217 currency code
     * @see https://core.telegram.org/bots/api/bots/payments#supported-currencies
     */
    currency: string,

    /**
     * Total price in the smallest units of the currency (integer, not
     * float/double). For example, for a price of US$ 1.45 pass amount = 145.
     * See the exp parameter in currencies.json, it shows the number of digits
     * past the decimal point for each currency (2 for the majority of currencies).
     * @see https://core.telegram.org/bots/payments/currencies.json
     */
    total_amount: number,

    /**
     * Bot specified invoice payload
     */
    invoice_payload: string,

    /**
     * Identifier of the shipping option chosen by the user
     */
    shipping_option_id?: string,

    /**
     * Order info provided by the user
     */
    order_info?: OrderInfo,
  };

  /**
   * Use this method to send a game. On success, the sent Message is returned.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SendGamePayload = {
    /**
     * Unique identifier for the target chat
     */
    chat_id: number,

    /**
     * Short name of the game, serves as the unique identifier for the game.
     * Set up your games via Botfather.
     * @see https://t.me/botfather
     */
    game_short_name: string,

    /**
     * Sends the message silently. Users will receive a notification with no sound.
     * @see https://telegram.org/blog/channels-2-0#silent-messages
     */
    disable_notification?: boolean,

    /**
     * If the message is a reply, ID of the original message
     */
    reply_to_message_id?: number,

    /**
     * A JSON-serialized object for an inline keyboard. If empty, one ‘Play
     * game_title’ button will be shown. If not empty, the first button must
     * launch the game.
     * @see https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating
     */
    reply_markup?: InlineKeyboardMarkup,
  };

  /**
   * This object represents a game. Use BotFather to create and edit games,
   * their short names will act as unique identifiers.
   */
  declare type Game = {
    /**
     * Title of the game
     */
    title: string,

    /**
     * Description of the game
     */
    description: string,

    /**
     * Photo that will be displayed in the game message in chats.
     */
    photo: PhotoSize[],

    /**
     * Brief description of the game or high scores included in the game
     * message. Can be automatically edited to include current high scores for
     * the game when the bot calls setGameScore, or manually edited using
     * editMessageText. 0-4096 characters.
     * @see https://core.telegram.org/bots/api#setgamescore
     * @see https://core.telegram.org/bots/api#editmessagetext
     */
    text?: string,

    /**
     * Special entities that appear in text, such as usernames, URLs, bot
     * commands, etc.
     */
    text_entities?: MessageEntity[],

    /**
     * Animation that will be displayed in the game message in chats. Upload
     * via BotFather
     * @see https://t.me/botfather
     */
    animation?: Animation,
  };

  /**
   * You can provide an animation for your game so that it looks stylish in
   * chats (check out Lumberjack for an example). This object represents an
   * animation file to be displayed in the message containing a game.
   * @see https://core.telegram.org/bots/api#game
   * @see https://t.me/gamebot
   * @see https://core.telegram.org/bots/api#games
   */
  declare type Animation = {
    /**
     * Unique file identifier
     */
    file_id: string,

    /**
     * Animation thumbnail as defined by sender
     */
    thumb?: PhotoSize,

    /**
     * Original animation filename as defined by sender
     */
    file_name?: string,

    /**
     * MIME type of the file as defined by sender
     */
    mime_type?: string,

    /**
     * File size
     */
    file_size?: number,
  };

  /**
   * Use this method to set the score of the specified user in a game. On
   * success, if the message was sent by the bot, returns the edited Message,
   * otherwise returns True. Returns an error, if the new score is not
   * greater than the user's current score in the chat and force is False.
   * @see https://core.telegram.org/bots/api#message
   */
  declare type SetGameScorePayload = {
    /**
     * User identifier
     */
    user_id: number,

    /**
     * New score, must be non-negative
     */
    score: number,

    /**
     * Pass True, if the high score is allowed to decrease. This can be useful
     * when fixing mistakes or banning cheaters
     */
    force?: boolean,

    /**
     * Pass True, if the game message should not be automatically edited to
     * include the current scoreboard
     */
    disable_edit_message?: boolean,

    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat
     */
    chat_id?: number,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,
  };

  /**
   * Use this method to get data for high score tables. Will return the score
   * of the specified user and several of his neighbors in a game. On
   * success, returns an Array of GameHighScore objects.
   * @see https://core.telegram.org/bots/api#gamehighscore
   */
  declare type GetGameHighScoresPayload = {
    /**
     * Target user id
     */
    user_id: number,

    /**
     * Required if inline_message_id is not specified. Unique identifier for
     * the target chat
     */
    chat_id?: number,

    /**
     * Required if inline_message_id is not specified. Identifier of the sent message
     */
    message_id?: number,

    /**
     * Required if chat_id and message_id are not specified. Identifier of the
     * inline message
     */
    inline_message_id?: string,
  };

  /**
   * This object represents one row of the high scores table for a game.
   */
  declare type GameHighScore = {
    /**
     * Position in high score table for the game
     */
    position: number,

    /**
     * User
     */
    user: User,

    /**
     * Score
     */
    score: number,
  };
}
