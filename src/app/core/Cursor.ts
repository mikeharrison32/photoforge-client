export class Cursor {
  private cursorElem?: HTMLElement | null;
  private imgDisplayElem?: HTMLElement | null;
  get style() {
    return this.cursorElem!.style;
  }
  constructor(id: string, options?: ICursorOptions) {
    this.cursorElem = document.getElementById(id);
    this.imgDisplayElem = document.getElementById('image-display');
    this.clearStyles();
    this.style.width = options?.width || '1rem';
    this.style.height = options?.height || '1rem';
    this.style.backgroundImage = `url(${options?.icon})`;
  }
  clearStyles() {
    this.style.width = '';
    this.style.height = '';
    this.style.border = '';
    this.style.borderRadius = '';
    this.style.backgroundImage = '';
  }
  setUp() {
    this.imgDisplayElem?.addEventListener('mousemove', (e: any) => {
      const rect = this.imgDisplayElem?.getBoundingClientRect();
      this.cursorElem!.style.left = `${
        e.clientX - rect!.left - this.cursorElem!.clientWidth / 2
      }px`;
      this.cursorElem!.style.top = `${
        e.clientY - rect!.top - this.cursorElem!.clientHeight / 2
      }px`;
    });
  }
}

interface ICursorOptions {
  width?: string;
  height?: string;
  icon?: string;
}
