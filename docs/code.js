/**
 * 2025 New Year Quine Animation
 * Fred Moser 2020-2025
 * https://fxi.io/
 */

/*
 * Create the HTML structure
 * Using id = p create a global 'p' used to set the content
 * Using 'x' as background-color, it's an invalid color and will be black.
 * The script is launched at init
 * NOTE: this code will not work, as there are too much new lines. New lines
 * should be removed. Read the main file for a working version
 *
 * Ref for the 16 bit pattern decimal -> binary
 * -> it's 2025 -> mirrored
 * 61166 ⬛⬛⬛⬜⬛⬛⬛⬜⬛⬛⬛⬜⬛⬛⬛⬜
 * 10408 ⬜⬜⬛⬜⬛⬜⬜⬜⬛⬜⬛⬜⬛⬜⬜⬜
 * 61102 ⬛⬛⬛⬜⬛⬛⬛⬜⬛⬜⬛⬜⬛⬛⬛⬜
 * 33442 ⬛⬜⬜⬜⬜⬜⬛⬜⬛⬜⬛⬜⬜⬜⬛⬜
 * 61166 ⬛⬛⬛⬜⬛⬛⬛⬜⬛⬛⬛⬜⬛⬛⬛⬜
 *
 */
document.body.id = "p";
document.body.bgColor = "x";
document.body.onload = () => {
  /* Update the DOM animation every 99ms */
  setInterval(
    /*
     * Create an arrow function with X as parameter (unused), where the comment
     * becomes part of the quine's source code
     */
    (f = (X) /*Happy New Year, Jo!*/ => {
      /* Initialize the variables:
       * i = iterator for character selection (0-187)
       * o = HTML string accumulator starting with <pre> tag
       * t = animation frame counter (initialized in setInterval)
       * b = binary pattern for '2025' top/bottom row (61166)
       * w = width of the display grid (24 characters)
       * l = function's source code + pre tag as a string
       */
      for (
        i = 0, o = "<pre>", t++, b = 61166, w = 24, l = f + o;
        i < 188;
        o +=
          ++i % w
            ? l[i].fontcolor(
                /* Binary patterns for the mirrored '2025' display.
                 * Row selection: (i / w + 6) & 7 ensures we stay within pattern bounds
                 */
                [b, 10408, 61102, 33442, b][(i / w + 6) & 7] &
                  /* Animation logic:
                   * 1. Bit shift creates scrolling effect: 1 << (i % w + t)
                   * 2. t % w > i - 1 handles gradual reveal of top line
                   * 3. If either condition is true, character is white (#fff)
                   */
                  (1 << ((i % w) + t)) || t % w > i - 1
                  ? "#fff"
                  : /* Matrix-like effect:
                     * Returns [0, dynamic_green, 0] where dynamic_green cycles
                     * through 0-31 based on character position and animation frame
                     */
                    [0, (i - t) & 31, 0]
              )
            : "\n"
      );
      p.innerHTML = o;
    }),
    (t = 99)
  );
};
