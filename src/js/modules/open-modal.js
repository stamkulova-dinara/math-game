let openModal=document.querySelector("#open-modal"),
    closeBtn=document.querySelector(".modal-page__close"),
    modalPage = document.querySelector('.modal-page')

export function openModalPage() {
    openModal?.addEventListener("click", ()=> modalPage.style.display = "block")
    closeBtn?.addEventListener("click", () => modalPage.style.display = "none")
} 