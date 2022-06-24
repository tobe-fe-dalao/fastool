/**
 * @func Print
 * @param {string} selector
 * @param {any} options
 * @desc  打印
 * @example Print('#print', {})
 */
class Print {
  protected selector: string;
  protected options: any;
  protected rootEl: HTMLElement | null = null;
  constructor(selector: string, options: any) {
    this.selector = selector;
    this.options = this.extend(
      {
        noPrint: ".no-print",
      },
      options
    );
    this.rootEl = document.querySelector(selector);

    // if (!(this instanceof Print)) return new Print(selector, options);
    this.init();
  }
  init() {
    if (!this.rootEl) {
      return;
    }
    let content = this.getStyle() + this.getHtml();
    this.writeIframe(content);
  }
  extend(obj: object, obj2: object) {
    for (let k in obj2) {
      obj[k] = obj2[k];
    }
    return obj;
  }

  getStyle() {
    let str = "",
      styles = document.querySelectorAll("style,link");
    for (let i = 0; i < styles.length; i++) {
      str += styles[i].outerHTML;
    }
    str +=
      "<style>" +
      (this.options.noPrint ? this.options.noPrint : ".no-print") +
      "{display:none;}</style>";

    return str;
  }

  getHtml() {
    let inputs = document.querySelectorAll("input");
    let textareas = document.querySelectorAll("textarea");
    let selects = document.querySelectorAll("select");

    for (let k = 0; k < inputs.length; k++) {
      if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
        if (inputs[k].checked == true) {
          inputs[k].setAttribute("checked", "checked");
        } else {
          inputs[k].removeAttribute("checked");
        }
      } else if (inputs[k].type == "text") {
        inputs[k].setAttribute("value", inputs[k].value);
      } else {
        inputs[k].setAttribute("value", inputs[k].value);
      }
    }

    for (let k2 = 0; k2 < textareas.length; k2++) {
      if (textareas[k2].type == "textarea") {
        textareas[k2].innerHTML = textareas[k2].value;
      }
    }

    for (let k3 = 0; k3 < selects.length; k3++) {
      if (selects[k3].type == "select-one") {
        let child = selects[k3].children;
        for (let i in child) {
          if (child[i].tagName == "OPTION") {
            if ((child[i] as any).selected == true) {
              child[i].setAttribute("selected", "selected");
            } else {
              child[i].removeAttribute("selected");
            }
          }
        }
      }
    }
    // 包裹要打印的元素
    // fix: https://github.com/xyl66/vuePlugs_printjs/issues/36
    let outerHTML = this.wrapperRefDom(this.rootEl).outerHTML;
    return outerHTML;
  }
  // 向父级元素循环，包裹当前需要打印的元素
  // 防止根级别开头的 css 选择器不生效
  wrapperRefDom(refDom: any) {
    let prevDom = null;
    let currDom = refDom;
    // 判断当前元素是否在 body 中，不在文档中则直接返回该节点
    if (!this.isInBody(currDom)) return currDom;

    while (currDom) {
      if (prevDom) {
        let element = currDom.cloneNode(false);
        element.appendChild(prevDom);
        prevDom = element;
      } else {
        prevDom = currDom.cloneNode(true);
      }

      currDom = currDom.parentElement;
    }
    return prevDom;
  }

  writeIframe(content: any) {
    let w: any,
      doc,
      iframe = document.createElement("iframe"),
      f: any = document.body.appendChild(iframe);
    iframe.id = "myIframe";
    //iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";
    iframe.setAttribute(
      "style",
      "position:absolute;width:0;height:0;top:-10px;left:-10px;"
    );
    w = f.contentWindow || f.contentDocument;
    doc = f.contentDocument || f.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
    let _this = this;
    iframe.onload = function () {
      _this.toPrint(w);
      setTimeout(function () {
        document.body.removeChild(iframe);
      }, 100);
    };
  }

  toPrint(frameWindow: any) {
    try {
      setTimeout(function () {
        frameWindow.focus();
        try {
          if (!frameWindow.document.execCommand("print", false, null)) {
            frameWindow.print();
          }
        } catch (e) {
          frameWindow.print();
        }
        frameWindow.close();
      }, 10);
    } catch (err) {
      console.log("err", err);
    }
  }
  // 检查一个元素是否是 body 元素的后代元素且非 body 元素本身
  isInBody(node: any) {
    return node === document.body ? false : document.body.contains(node);
  }
};
// const MyPlugin = {};
// MyPlugin.install = function (Vue, options) {
//   // 4. 添加实例方法
//   Vue.prototype.$print = Print;
// };
export default Print;
