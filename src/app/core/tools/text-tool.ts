export class TextTool {
  properties?: ITextToolOptions;
  type: string = 'textTool';
  configure(display: HTMLElement) {
    display.style.cursor = 'text';
    display.addEventListener('mousedown', (e) => {
      const textarea = document.createElement('textarea');
      display.appendChild(textarea);
      textarea.classList.add('textarea');
      const rect = textarea.getBoundingClientRect();
      textarea.style.left = e.clientX - rect!.left + 'px';
      textarea.style.top = e.clientY + 'px';
    });
  }

  disconfigure(display: HTMLElement): void {
    display.style.cursor = 'default';
  }
}

export const textTool = new TextTool();

interface ITextToolOptions {
  fontFamily?: string;
  fontStyle?: string;
  fontSize?: number;
  color?: string;
}
