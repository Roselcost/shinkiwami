import { useSelector } from "react-redux";
import Button from "../../ui/Button/Button";
import Icon from "../../ui/Icon/Icon";
import classes from "./About.module.css";
import strings from "../../assets/strings.json";
import { State } from "../../types/state";

function About() {
  const language = useSelector((state: State) => state.language);

  const shareToTwitter = () => {
    const textToShare =
      "Create your own cool character introduction like the ones in the Like a Dragon videogame series! #Yakuza #LikeADragon #LikeADragonInfiniteWealth #RyuGaGotoku";
    const urlToShare = "https://roselcost.github.io/shinkiwami/";

    const encodedText = encodeURIComponent(textToShare);
    const encodedUrl = encodeURIComponent(urlToShare);

    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

    window.open(twitterShareUrl);
  };

  return (
    <>
      <div className={classes.content}>
        <div className={classes.heading}>
          <Icon icon={"icons/info.svg"}></Icon>
          <h2>{strings[language].instructions}</h2>
        </div>
        <ul>
          <li>
            Write the name and the subtitles that you want. You can leave the
            second line in blank in case you want to write only 1 line. If you
            write 2 lines, it's recommended to put a comma at the end of the
            first line, that's how they do it in the Like a Dragon videogames.
          </li>
          <li>
            Adjust shadows, brightness and contrast if you are not satisfied
            with the default values (image too dark, etc).
          </li>
          <li>Upload your image.</li>
          <li>Crop the image to your liking with the image cropper.</li>
          <li>Download your image.</li>
          <li>
            You can also play the animation like in the Like a Dragon
            videogames.
          </li>
          <li>
            NOTE: Unfortunately, there is no way to download the animation. If
            you want to save it, I recommend you to use an app like Xbox Game
            Bar on Windows, Quicktime on Mac or OBS Studio to record the part of
            the screen corresponding to the animation.
          </li>
        </ul>
        <div className={classes.heading}>
          <Icon icon={"icons/user.png"}></Icon>
          <h2>{strings[language].about}</h2>
        </div>
        <ul>
          <li>
            Create character introduction screens like the ones in the Like a
            Dragon (formerly Yakuza) videogame series! Have you ever imagined
            being a part of the series? Now you can do it with style, as they do
            many unforgettable characters such as Kiryu, Nishiki, Kuze, Saeko,
            Majima, Akiyama, Kiyomi, Date and so many more! You can even play
            the animation the exact same way like in the videogame, with the
            sound effect and the fade to white and black and all. Isn't that
            cool?
          </li>
          <li>
            This is a remake of the{" "}
            <a
              target="_blank"
              href="https://roselcost.github.io/kiwamigenerator/"
            >
              Kiwami Introduction Generator
            </a>
            , an application I made back in 2020. The goal back then was to have
            some practice on Vue and do something fun meanwhile.
          </li>
          <li>
            The main reason why I remade this app was because I wanted to have a
            more polished version, since many people are using it and, honestly,
            the first version was kinda embarassing in some ways and you deserve
            better. Also, I was looking for a side project to do using React and
            this was perfect for the task. This time I aimed to replicate the UI
            of the latest Like a Dragon games, such as Infinite Wealth. Hope you
            like it.
          </li>
          <li>
            Many people asked me about downloading the video of the effect.
            Sadly, it's quite challenging to do so. I tried several approaches
            like trying to take screenshots for each frame in the first second
            of the animation (the whole animated part) and join them together
            but I could only get like 15 frames at best in that timeframe with
            the current library I'm using. So please, stick to using another
            application to record a fragment of your screen. I'm so sorry for
            that!
          </li>
          <li>
            Do you have some feedback or suggestions? Do you want to translate
            it to another language? You can{" "}
            <a target="_blank" href="https://twitter.com/roselcost">
              contact me
            </a>{" "}
            and I'll answer as soon as possible.
          </li>
          <li>
            You can find the repository here. Feel free to contribute or fork it
            if you like.
          </li>
        </ul>
        <div className={classes.buttons}>
          <Button
            onClick={() =>
              window.open("https://github.com/Roselcost/shinkiwami")
            }
            icon={"icons/github.svg"}
            label="Github"
          />
        </div>
        <div className={classes.heading}>
          <Icon icon={"icons/share.svg"}></Icon>
          <h2>{strings[language].share}</h2>
        </div>
        <ul>
          <li>
            Feel free to share this website! It will make me very happy 😁
          </li>
        </ul>
        <div className={classes.buttons}>
          <Button
            onClick={() => shareToTwitter()}
            icon={"icons/twitter-alt.svg"}
            label="Share"
          />
          {/* <Button icon={"src/assets/icons/instagram.svg"} label="Share" />
        <Button icon={"src/assets/icons/tik-tok.svg"} label="Share" /> */}
        </div>
      </div>
    </>
  );
}

export default About;
