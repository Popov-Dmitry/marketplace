export const blink = (id) => {
    document.getElementById(id).classList.add("form-control-error");
    setTimeout(() => document.getElementById(id).classList.remove("form-control-error"), 400)
    setTimeout(() => document.getElementById(id).classList.add("form-control-error"), 800)
    setTimeout(() => document.getElementById(id).classList.remove("form-control-error"), 1200)
}