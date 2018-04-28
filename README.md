# netflix-activity-extract

## Description

This is the source code for a userscript which enables Netflix users to extract their activity from the [Viewing Activity page](https://www.netflix.com/viewingactivity). It is published on [OpenUserJS](https://openuserjs.org/users/Notuom/scripts).

The purpose is for a Netflix user to be able to view all the things they watched in digestible format, without having to scroll through all the episodes of Friends they watched.

## How to use

To use it, import the userscript (`netflix-activity-extract.user.js`) in your userscript manager, enable it and go to [https://www.netflix.com/viewingactivity](https://www.netflix.com/viewingactivity) while logged in. Depending on your userscript manager, the way to run the script might be different. For TamperMonkey on Chrome, click on the TamperMonkey icon in the extension bar and then click the Start menu item which is added by this userscript. If you change your mind, you can click the Stop item from the same place.

It generates and "downloads" two files:

* `titles.txt`, which is simply a list of all the titles as displayed on the page, in the same order
* `watched-titles.csv`, which is a comma-separated values file which can be opened in a spreadsheet application. The following fields are included:
    * Title: The title of the movie or series
    * Count: The number of times it appeared in the viewing history (for series, every episode appears separately)
    * Date: The date this title was watched on (for series, the latest date an episode was watched)
    * Series?: Is this title a series? (Yes / No)

### How it works

The script works by simply scrolling to the bottom of the list and, when done, extracting the information from the DOM into the files described above.

The method used is rather clunky (it relies on scrolling the window and waiting for a loader element to not be present anymore), but it should work well enough for its purpose. Of course, any kind of change to the viewingactivity page on Netflix will break this script.

## Compatibility Notes

Tested and only expected to work with English US locale. Tested only with TamperMonkey on Chrome.

## Contributing

Feel free to open an issue or a pull request if you find a bug or have a feature request. The userscript itself is built by bundling the `index.js` file and its required modules using webpack with the `npm run build` command.

## License

Copyright 2018 Karl Thibault

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## Thanks to

* [FileSaver.js](https://github.com/eligrey/FileSaver.js/) for making browser file generation easy
* [Webpack](https://webpack.js.org/) for making JavaScript bundling and the usage of recent features in browsers painless
