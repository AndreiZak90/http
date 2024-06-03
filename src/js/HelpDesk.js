import tick from "../images/tick.png";
import pencil from "../images/pencil.png";
import cross from "../images/cross.png";

export default class HelpDesk {
  constructor(container) {
    this.responseAll;
    this.rootBox = document.body.querySelector("#root");

    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
  }

  init() {
    this.loader();
    this.addTikkets();
  }

  loader() {
    document.addEventListener("DOMContentLoaded", async (ev) => {
      ev.preventDefault();

      const fet = await fetch("http://localhost:7070/?method=allTickets", {
        method: "GET",
      });
      this.responseAll = await fet.json();

      for (const item of this.responseAll) {
        this.addTikket(
          this.rootBox,
          item.id,
          item.name,
          item.description,
          item.status
        );
      }
    });
  }

  addTikket(elem, id, name, description, status) {
    const tikketBox = document.createElement("div");
    tikketBox.classList.add("tikket_box");
    tikketBox.dataset.id = `${id}`;

    const btnPerfomans = document.createElement("button");
    btnPerfomans.classList.add("btn_performance");

    const perfImg = document.createElement("img");
    perfImg.classList.add("perfomans_img");
    perfImg.src = tick;
    if (status !== false) {
      perfImg.classList.add("perfomans_img_activ");
    }
    btnPerfomans.append(perfImg);

    const deckBox = document.createElement("div");
    deckBox.classList.add("description_box");

    const descLit = document.createElement("p");
    descLit.classList.add("description_lit");
    descLit.textContent = name;

    const descMax = document.createElement("p");
    descMax.classList.add("description_max");
    descMax.textContent = description;

    deckBox.append(descLit);
    deckBox.append(descMax);

    const tikData = document.createElement("p");
    tikData.classList.add("tikket_data");
    tikData.textContent = this.time();

    const tikEdit = document.createElement("button");
    tikEdit.classList.add("tikket_edit");

    const ticEditImg = document.createElement("img");
    ticEditImg.classList.add("edit_img");
    ticEditImg.src = pencil;
    tikEdit.append(ticEditImg);

    const tikDelete = document.createElement("button");
    tikDelete.classList.add("tikket_delete");

    const tikDeleteImg = document.createElement("img");
    tikDeleteImg.classList.add("delete_img");
    tikDeleteImg.src = cross;
    tikDelete.append(tikDeleteImg);

    tikketBox.append(btnPerfomans);
    tikketBox.append(deckBox);
    tikketBox.append(tikData);
    tikketBox.append(tikEdit);
    tikketBox.append(tikDelete);

    elem.append(tikketBox);

    deckBox.addEventListener("click", () => {
      const parent = deckBox.closest(".tikket_box");
      parent.classList.toggle("tikket_box_max");
    });

    btnPerfomans.addEventListener("click", () => {
      perfImg.classList.toggle("perfomans_img_activ");
      if (perfImg.classList.contains("perfomans_img_activ")) {
        this.editTikket(
          id,
          (status = true),
          tikData.value,
          descLit.value,
          descMax.value
        );
      } else {
        this.editTikket(
          id,
          (status = false),
          tikData.value,
          descLit.value,
          descMax.value
        );
      }
    });

    tikEdit.addEventListener("click", () => {
      this.modalEditTikket(id, (status = false), tikData.value);
    });

    tikDelete.addEventListener("click", () => {
      const id = tikketBox.dataset.id;
      this.modalDeleteTikket(id, tikketBox);
    });
  }

  modalNewTikket(elem) {
    const newTikket = document.createElement("form");
    newTikket.classList.add("add_new_tikket");
    const tikTitle = document.createElement("h3");
    tikTitle.classList.add("newTikket_title");
    tikTitle.textContent = "Добавить тиккет";
    newTikket.append(tikTitle);

    const tikForm = document.createElement("form");
    tikForm.classList.add("newTikket_form");
    const formSpan = document.createElement("span");
    formSpan.classList.add("description_input");
    formSpan.textContent = "Краткое описание";
    tikForm.append(formSpan);
    const inpDes = document.createElement("textarea");
    inpDes.classList.add("input_lit_description");
    inpDes.rows = "2";
    tikForm.append(inpDes);
    const formSpanMax = document.createElement("span");
    formSpanMax.classList.add("description_input");
    formSpanMax.textContent = "Подробное описание";
    tikForm.append(formSpanMax);
    const inpDesMax = document.createElement("textarea");
    inpDesMax.classList.add("input_max_description");
    inpDesMax.rows = "4";
    tikForm.append(inpDesMax);

    const btnBox = document.createElement("div");
    btnBox.classList.add("input_buttons");
    const cancel = document.createElement("button");
    cancel.classList.add("cancel_btn");
    cancel.textContent = "Отмена";
    btnBox.append(cancel);
    const addBtnNew = document.createElement("button");
    addBtnNew.classList.add("new_form_btn");
    addBtnNew.textContent = "Ок";
    btnBox.append(addBtnNew);
    tikForm.append(btnBox);

    newTikket.append(tikForm);

    cancel.addEventListener("click", () => {
      newTikket.remove();
    });

    addBtnNew.addEventListener("click", () => {
      this.loadNewTikket(inpDes.value, inpDesMax.value);
    });

    elem.append(newTikket);
  }

  modalEditTikket(id, status, data) {
    const newTikket = document.createElement("div");
    newTikket.classList.add("this_edit_tikket");

    const tikTitle = document.createElement("h3");
    tikTitle.classList.add("newTikket_title");
    tikTitle.textContent = "Редактировать тиккет";
    newTikket.append(tikTitle);

    const tikForm = document.createElement("form");
    tikForm.classList.add("newTikket_form");
    const formSpan = document.createElement("span");
    formSpan.classList.add("description_input");
    formSpan.textContent = "Краткое описание";
    tikForm.append(formSpan);
    const inpDes = document.createElement("textarea");
    inpDes.classList.add("input_lit_description");
    inpDes.rows = "2";
    tikForm.append(inpDes);
    const formSpanMax = document.createElement("span");
    formSpanMax.classList.add("description_input");
    formSpanMax.textContent = "Подробное описание";
    tikForm.append(formSpanMax);
    const inpDesMax = document.createElement("textarea");
    inpDesMax.classList.add("input_max_description");
    inpDesMax.rows = "4";
    tikForm.append(inpDesMax);

    const btnBox = document.createElement("div");
    btnBox.classList.add("input_buttons");
    const cancel = document.createElement("button");
    cancel.classList.add("cancel_btn");
    cancel.textContent = "Отмена";
    btnBox.append(cancel);
    const addBtnEdit = document.createElement("button");
    addBtnEdit.classList.add("add_form_btn");
    addBtnEdit.textContent = "Ок";
    btnBox.append(addBtnEdit);
    tikForm.append(btnBox);

    newTikket.append(tikForm);

    cancel.addEventListener("click", () => {
      newTikket.remove();
    });

    addBtnEdit.addEventListener("click", () => {
      this.editTikket(id, status, data, inpDes.value, inpDesMax.value);
    });

    document.body.append(newTikket);
  }

  modalDeleteTikket(element, tic) {
    const newTikket = document.createElement("div");
    newTikket.classList.add("this_edit_tikket");

    const tikTitle = document.createElement("h3");
    tikTitle.classList.add("newTikket_title");
    tikTitle.textContent = "Удалить тиккет?";
    newTikket.append(tikTitle);

    const textTikket = document.createElement("p");
    textTikket.classList.add("textDeleteTikket");
    textTikket.textContent =
      "Вы точно хотите удалить тиккет? это действие необратимое!!!";
    newTikket.append(textTikket);

    const btnBox = document.createElement("div");
    btnBox.classList.add("input_buttons");
    const cancel = document.createElement("button");
    cancel.classList.add("cancel_btn");
    cancel.textContent = "Отмена";
    btnBox.append(cancel);
    const addBtnDel = document.createElement("button");
    addBtnDel.classList.add("del_form_btn");
    addBtnDel.textContent = "Ок";
    btnBox.append(addBtnDel);
    newTikket.append(btnBox);

    document.body.append(newTikket);

    cancel.addEventListener("click", () => {
      newTikket.remove();
    });

    addBtnDel.addEventListener("click", () => {
      this.deleteTikket(element, newTikket, tic);
    });
  }

  time() {
    const Data = new Date();
    const Year = Data.getFullYear();
    const Month = Data.getMonth();
    const Day = Data.getDate();
    const Hour = Data.getHours();
    const Minutes = Data.getMinutes();

    return `${Day}-${Month + 1}-${Year} ${Hour}:${Minutes}`;
  }

  loadNewTikket(name, dependens) {
    const data = {
      name: name,
      description: dependens,
      status: false,
    };

    fetch("http://localhost:7070/?method=createTicket", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteTikket(elem, modal, tic) {
    fetch(`http://localhost:7070/?method=deleteById&id=${elem}`, {
      method: "GET",
    });
    modal.remove();
    tic.remove();
  }

  addTikkets() {
    const btn = document.body.querySelector(".add_tikket");
    const body = document.body;
    btn.addEventListener("click", () => {
      this.modalNewTikket(body);
    });
  }

  async editTikket(id, status, data, litDesk, maxDesk) {
    const editTic = {
      id: id,
      name: litDesk,
      description: maxDesk,
      status: status,
      created: data,
    };
    await fetch(`http://localhost:7070/?method=updateById&id=${id}`, {
      method: "POST",
      body: JSON.stringify(editTic),
    });
  }
}
