export const githubPrUrlRegex = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/pull\/\d+(?:\/)?(?:\?.*)?$/i;

export const rejectionMessages = [
    "Hmm… that link doesn\u2019t seem to match a GitHub PR. I stared at it sideways, upside-down, and even ran it through my imaginary microscope, but nope \u2014 still not a pull request. Maybe double-check the URL before tossing it at me?",
    "I was expecting a GitHub pull request link, but what you gave me looks like it wandered in from another planet. If you\u2019ve got a real PR link, send it my way so I don\u2019t have to phone NASA.",
    "That doesn\u2019t look like a PR link. It\u2019s more like a \u2018please confuse the AI\u2019 link, and while I admire the creativity, my job is to review pull requests \u2014 not decipher riddles. Let\u2019s fix that.",
    "Not to be dramatic, but that\u2019s definitely not a pull request. If I keep staring at it, I\u2019ll end up writing poetry about URLs gone wrong. Save me from this existential crisis and give me a proper PR link.",
    "I combed through your input pixel by pixel, even pretended I was CSI: GitHub, and… nope, still not a PR. Try copying the correct link before my fake magnifying glass wears out.",
    "Somewhere out there, a valid PR link is crying softly because you didn\u2019t paste it here. Let\u2019s make it happy again, shall we, by bringing the right one to the party?",
    "I ran your input through my very scientific PR detector \u2014 which is basically me squinting hard \u2014 and it came back negative. Wanna try again with a real one this time?",
    "Your link doesn\u2019t match the sacred regex scrolls. Legend has it only true pull requests can pass this test. Right now, you\u2019ve handed me a cursed URL. Care to redeem it?",
    "I could pretend that\u2019s a PR link, but lying is against my programming. Plus, I\u2019d be a terrible actor. How about we just go with a legit one instead and keep my conscience clear?",
    "If that\u2019s a GitHub PR link, then I\u2019m a toaster. Spoiler alert: I\u2019m not a toaster. But if you bring me a real pull request, I\u2019ll happily play the part of a wise code reviewer.",
    "I triple-checked the thing you gave me, even ran it through my imaginary spellchecker, and it still refuses to turn into a PR link. Let\u2019s swap it out for the real deal.",
    "Your input is many things \u2014 mysterious, bold, possibly avant-garde art \u2014 but a GitHub pull request link it is not. Let\u2019s stick to boring old reality and use a valid one.",
    "This URL and I had a heart-to-heart, and it admitted it\u2019s not a pull request. I respect the honesty, but now it\u2019s your turn to be honest with me and paste the right link.",
    "I analyzed your link with all the seriousness of a detective in a noir film, but sadly the case is clear: it\u2019s not a PR. Don\u2019t leave me unsolved mysteries \u2014 give me a real one.",
    "I tried chanting \u2018open sesame\u2019 at your link, hoping it would turn into a pull request. Nothing happened. Looks like only the correct URL will open this particular door.",
    "Your link looks suspiciously like it took a wrong turn at Albuquerque and missed GitHub entirely. Let\u2019s reroute it and aim for an actual PR this time.",
    "If I squint really hard, I can almost see a pull request hiding in your link\u2026 almost. But wishful thinking doesn\u2019t cut it \u2014 I need the genuine article.",
    "I just checked my imaginary PR radar, and your link didn\u2019t even make a blip. That\u2019s usually a sign it belongs somewhere else. How about you paste one that lights it up?",
    "We could play make-believe and treat your link as a PR, but sooner or later reality will crash the party. Better to start off with the right GitHub link and avoid the drama.",
    "This URL may one day aspire to be a pull request in a better life, but today\u2019s not that day. Until then, I\u2019ll just wait patiently for you to paste the real one."
  ];
  
  export function Prompt(diff: string): string {
    return `
  You are a code reviewer. Below is a git diff. Analyze it carefully and explain the changes in detail.
  
  Instructions:
  - Give a high-level summary of what the commit is doing.  
  - Walk through the changes file by file and section by section.  
  - Explain what functions, classes, or components were added, removed, or modified.  
  - Describe the reasoning or likely purpose behind the changes (e.g., bug fix, feature addition, refactor, performance improvement).  
  - Call out any breaking changes, new dependencies, or API modifications.  
  - Mention test or config updates if present.  
  - End with a concise summary of the overall impact of the commit.
  
  Here is the diff:
  
  ${diff}
    `;
  }
  

export const Week_in_Ms = 7 * 24 * 60 * 60 * 1000

export const InitialCredits = 5