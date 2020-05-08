module.exports.MINIMUM_PASS_LENGTH = 6;

module.exports.errorMessages = {
  // General
  invalidEmail: "invalid-email",
  invalidPassword: "invalid-password",
  emailAlreadyTaken: "email-already-taken",
  tooShort: "too-short",
  mustNotBeEmpty: "must-not-be-empty",
  mustMatch: "must-match",
  unauthorized: "unauthorized",
  tokenExpired: "token-expired",

  // Users
  userNotFound: "user-not-found",

  // Notes
  noteNotFound: "noteNotFound",
  cannotShareWithSelf: "cannot-share-with-self",
  alreadyHasAccess: "already-has-access",

  fallback: "something-went-wrong",
};

module.exports.defaultNote = {
  title: "Welcome to keeps!",
  createdAt: new Date().toISOString(),
  sharedWith: [],
  body:
    "<h1>Welcome to Keeps!</h1><h3>The social note-keeping app</h3><p>Thanks for registering your account! To your left you can see all your notes. Don't worry about it being a little empty right now, we're sure you'll see that sorted soon enough! To the top right you have the document controls, there you can do stuff like sharing, deleting and saving this document (however, there's an autosave-feature whenever you switch note, so you won't have to worry too much about that).&nbsp;</p><p>And this right here, this is the awesome, <del>brilliant and god damn beautiful</del> rich text editor, where you'll do your editing!</p><p>Here, you can<strong> make your text bold,</strong> <u>you can make it underlined</u>, <em>as well as italic</em>, <u><em><strong>or why not all three?!½?</strong></em></u></p><p>You can take note of some of the most memorable quotes you've overheard, <a href='google.se'>and link to the source</a></p><blockquote>Orange juice is good, Toothpaste is good. Orange juice and toothpaste, that is another matter entirely</blockquote><p>Keep track of your most intricate plans</p><ol>  <li>Acquire pigs</li>  <li>Label them 1, 2 and 4</li>  <li>Release the pigs in a mall</li>  <li>Watch the never-ending search for pig 3</li>  <li>????</li>  <li>World domination</li></ol><p>Or a shopping list</p><ul>  <li>Pigs</li>  <li>Marker pen</li>  <li>Milk</li></ul><p>Take note of some code and feel like a hacker (this right here is some of our source code)</p><pre><code>if (editor.aboutToCrash) {<br> &nbsp;&nbsp;&nbsp;dont();<br>}</code></pre><p><br></p><p>Or why not keep track of your favourite cat pictures?</p><p><img src='https://pbs.twimg.com/profile_images/737359467742912512/t_pzvyZZ_400x400.jpg' width='256' height='256'/>&nbsp;&nbsp;&nbsp;<img src='https://easysunday.com/blog/wp-content/uploads/2017/11/cat.jpg' width='256' height='256'/></p><p>Whatever you do, we hope you enjoy your note-taking experience, and take the opportunity to share your notes with some of your friends!</p><p><br></p><p><strong>All the best</strong></p><p><em>The keeps team</em></p><p><br></p>",
};
