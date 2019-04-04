document.addEventListener('DOMContentLoaded', function() {
    M.updateTextFields();

    var elemsDate = document.querySelectorAll('.datepicker');
    var instancesDate = M.Datepicker.init(elemsDate, options);

    var elemsTime = document.querySelectorAll('.timepicker');
    var instancesTime = M.Timepicker.init(elemsTime, options);

    var elemsSelect = document.querySelectorAll('select');
    var instancesSelect = M.FormSelect.init(elemsSelect, options);

    document.querySelectorAll('textarea').characterCounter();
    document.querySelectorAll('#species, #speciessciname').characterCounter();
});