document.addEventListener("DOMContentLoaded", function() {
    M.AutoInit();

    M.updateTextFields();

    let dateOptions = {
        maxDate: new Date(),
        autoClose: true
    }
    let elemsDate = document.querySelectorAll(".datepicker");
    let instancesDate = M.Datepicker.init(elemsDate, dateOptions);

    let timeOptions = {
        autoClose: true,
        twelveHour: false
    }
    let elemsTime = document.querySelectorAll(".timepicker");
    let instancesTime = M.Timepicker.init(elemsTime, timeOptions);

    let elemsSelect = document.querySelectorAll("select");
    let instancesSelect = M.FormSelect.init(elemsSelect);

    let elemsOpts = document.querySelectorAll("select");
    let instancesOpts = M.FormSelect.init(elemsOpts);

    $("textarea").characterCounter();
    $("input#species, input#species-sci-name").characterCounter();
});