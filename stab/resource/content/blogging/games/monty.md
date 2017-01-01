<div id="meta">

<meta name="created" content="Sun Jan 1 2017 23:14:00 GMT+0100">
<meta name="lastmodified" content="auto">

<meta name="title" content="Monty Hall Problem revisited">
<meta name="urlname" content="games/monty-hall-problem-revisited">
<meta name="subtitle" content="A new approach at explaining why switching choices in the Monty Hall Problem makes sense.">

<meta name="author" content="sebastian">
<meta name="description" content="A new approach at explaining why switching choices in the Monty Hall Problem makes sense.">
<meta name="keywords" content="Monty Hall Problem, Game Theory">
<meta name="stab-github-comments-issue-url" content="https://github.com/MrShoenel/mrshoenel.github.io/issues/2">

</div>

You probably recall the movie *21* with Kevin Spacey where his attention (as the teacher) is caught by a student answering a question to a renown paradox correctly. The one I am talking about is called the *<a href="https://en.wikipedia.org/wiki/Monty_Hall_problem">Monty Hall Problem</a>*. However it actually is called a paradox because understanding <b>why</b> it is actually advisable to switch choices is not exactly trivial. I am writing this because all the explanations I was able to find are more or less the same and haven't been that helpful to me. So I came up with my own and I'd like to share it with you.

<div role="youtube-wrapper" data-for-id="Zr_xWfThjJ0"></div>

## Getting the assumptions right
Before we start, it is important to note which are the assumptations my approach is based on. It's these three (as on Wikipedia):
* The host opens another door than the one picked by the contestant
* The door opened by the host must always reveal a goat
* The contestant is offered the possibility to switch their initial choice

## One more assumption
I am adding one more assumption that the contestant should make to understand their game better.
* The contestant must assume to have picked the goat ***initially***.

This is a very important point and an assumption fair to make. We know there are three doors and two of them have a goat behind them; only one, when opened, will reveal a prize. Thus, the probability of *having picked one of the goats initially* is two thirds (2/3 or 66.6%). Putting it slightly different, it is more likely having picked a goat initially than having picked the prize.

## Do you really want to switch or would you rather go with the washing machine?
Now the gameshow master opens another door with a goat. And he asks you whether or not you want to overthink your initial choice and would like to pick the other, remaining door. You should. And here's why:
* One goat has been definitively eliminated by the gameshow master.
* The other one **you have already picked** with that 66.6% probability (at least that's what you **have to** assume).
* You must leave the sinking ship -  as currently, you have to assume that the two goats have been picked by the gameshow master and you.

## Let's confuse this a little
Initially I thought that after the first goat is revealed, the game is kind of reset. Because immediately after that, there are two doors left with one having the prize and one having a goat behind them. So the odds must be 50/50 then, because you can decide for either door. However **that is not correct** because this ignores what happened before.

The actual truth is, you can choose between two doors, but the probability of one door revealing the prize once opened, is **bigger** than for the other door (actually it's one third (33.3%) vs. two thirds (66.6%)). And this is where people get confused. Choosing between two options *naturally* tells you that your chance of picking correctly is exactly 50/50.

But let's rewind. You picked the goat initially by a 66.6% chance. Although the other goat got revealed now, these initial two thirds haven't changed. At this point, statistically, one goat's position can be ascertained by 100% and the other one's position is secured by another 66.6%. So you are sure by two thirds that currently, should you not change your pick, you would lose as you have most likely selected the other goat currently.
