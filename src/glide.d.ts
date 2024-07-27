declare module '@glidejs/glide' {
  interface Options {
    type?: 'carousel' | 'slider';
    startAt?: number;
    perView?: number;
    focusAt?: number | 'center';
    gap?: number;
    autoplay?: number | boolean;
    hoverpause?: boolean;
    keyboard?: boolean;
    breakpoints?: {
      [key: number]: {
        perView: number;
      };
    };
    [key: string]: any;
  }

  class Glide {
    constructor(selector: string, options?: Options);
    mount(): void;
  }

  export default Glide;
}