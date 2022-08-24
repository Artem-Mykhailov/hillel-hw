"use strict";

const STICKER_ITEM_SELECTOR = ".sticker";
const DELETE_BTN_SELECTOR = ".deleteBtn";
const NOTE_INPUT_SELECTOR = ".note-field";

let stickerList = [];

const $addButton = $("#btn");
const $stickerList = $(".note-content");

$addButton.on("click", onAddButtonClick);
$stickerList.on("click", DELETE_BTN_SELECTOR, onDeleteButtonClick);
$stickerList.on("focusout", NOTE_INPUT_SELECTOR, onNoteInputFocusOut);

StickerApi.getList()
  .then((sticker) => {
    stickerList = sticker;

    renderStickerList(sticker);
  })
  .catch(showError);

function onAddButtonClick(e) {
  const sticker = {
    description: "",
  };

  StickerApi.create(sticker)
    .then((newSticker) => {
      renderSticker(newSticker);
    })
    .catch(showError);
}

function onDeleteButtonClick(e) {
  const $stickerItem = getStickerItem($(e.target));
  const id = getStickerItemId($stickerItem);

  StickerApi.delete(id).catch(showError);
  $stickerItem.remove();
}

function onNoteInputFocusOut(e) {
  const $stickerItem = getStickerItem($(e.target));
  const id = getStickerItemId($stickerItem).toString();
  const sticker = getSticker(id);

  StickerApi.update(id, sticker)
    .then(StickerApi.getList)
    .then(renderStickerList)
    .catch(showError);
}

function renderStickerList(sticker) {
  const html = sticker.map(generateStickerHTML).join("");

  $stickerList.html(html);
}

function renderSticker(stick) {
  const html = generateStickerHTML(stick);

  $stickerList.append(html);
}

function getSticker(id) {
  const $input_text = $("textarea")
    .eq(id - 1)
    .val();
  let sticker = stickerList.find((stickerItem) => stickerItem.id === id);
  sticker.description = $input_text;

  return sticker;
}

function getStickerItem($el) {
  return $el.closest(STICKER_ITEM_SELECTOR);
}

function getStickerItemId($el) {
  return $el.data("id");
}

function showError(e) {
  alert(e.message);
}

function generateStickerHTML(sticker) {
  return `
  <div 
  class="sticker"
  data-id="${sticker.id}">
  
  <button class="deleteBtn fas fa-times"></button>
  
  <textarea
  name="description"
  class="note-field"
  rows="5"
  placeholder="Your note"
  maxlength="300"
>${sticker.description}</textarea>

</div>
`;
}
