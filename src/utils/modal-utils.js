export class ModalUtils {
    static buttonModalChange(objElements, item) {
        objElements.recordsChangeElement.innerHTML = '';
        objElements.recordsChangeElement.innerHTML = `<button type="button" class="btn btn-success title-page me-2" id="records-change-delete${item.id}" data-bs-dismiss="modal">Да, удалить</button>
                        <button type="button" class="btn btn-danger title-page" data-bs-dismiss="modal">Не удалять</button>`;
    }
}