/*
 * Main logic for the userscript (scrolling, extraction and exporting)
 */
import WatchedTitle from './watched-title.js';
import {
  saveAs
} from 'file-saver';

window.netflix_activity_extract__stop = () => {
  console.log("netflix-activity-extract: Stop");
  clearInterval(window.netflix_activity_extract__interval);
};

window.netflix_activity_extract__run = () => {
  console.log("netflix-activity-extract: Start");
  window.netflix_activity_extract__interval = setInterval(() => {
    scrollTo(0, document.body.scrollHeight);
    setTimeout(() =>  {
      const element = document.querySelector(".responsive-account-container > div > div > .basic-spinner");
      if (element === null) {
        window.netflix_activity_extract__stop();
        const listNode = document.querySelector(".retable");
        if (listNode !== null) {
          parseAndSave(listNode);
          alert("Done!");
        } else {
          alert("Can't find the activity list!");
        }
      }
    }, 50);
  }, 500);

  function parseAndSave(listNode) {
    const titleRegEx = /^(.*?):(.*?):(.*?)$/;
    const blobMetaData = {
      type: "text/plain;charset=utf-8"
    };

    const completeTitles = [];
    const watchedTitleMap = {};

    if (listNode.hasChildNodes()) {
      let completeTitle, date, title, match, isSeries;
      for (var i = 0; i < listNode.childNodes.length; i++) {
        completeTitle = listNode.childNodes[i].querySelector('.title a').text;
        date = listNode.childNodes[i].querySelector('.date').innerHTML;
        completeTitles.push(completeTitle);
        isSeries = (match = titleRegEx.exec(completeTitle)) !== null;
        title = isSeries ? match[1] : completeTitle;

        if (watchedTitleMap.hasOwnProperty(title)) {
          watchedTitleMap[title].count++;
        } else {
          watchedTitleMap[title] = new WatchedTitle(title, date, isSeries);
        }
      }
    }

    const titlesText = completeTitles.join('\n');
    const titlesBlob = new Blob([titlesText], blobMetaData);
    saveAs(titlesBlob, 'titles.txt');

    const watchedTitles = Object.values(watchedTitleMap)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(watchedTitle => '"' + watchedTitle.title.replace(/"/g, "''") + '"' + ',' +
        watchedTitle.count + ',' +
        watchedTitle.date + ',' +
        (watchedTitle.isSeries ? 'Yes' : 'No'));

    const watchedTitlesText = '"Title","Count","Date","Series?"\n' + watchedTitles.join('\n');
    const watchedTitlesBlob = new Blob([watchedTitlesText], blobMetaData);
    saveAs(watchedTitlesBlob, 'watched-titles.csv');
  }
};
