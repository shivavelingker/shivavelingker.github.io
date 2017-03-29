// ==UserScript==
// @name         UT RLA Mail System Revamped
// @namespace    utexas_rla_packages
// @version      2.0
// @description  Log packages and search residents faster and more efficiently
// @author       Shiva Velingker
// @match        https://utdirect.utexas.edu/hfhall/rla/addUpdPkg_UPPK.WBX*
// @grant        none
// ==/UserScript==

//Fill RLA form with data
if(getParameterByName('l') !== null){
    var form = document.forms.rla_form;
    //Desk Location
    form.elements.sRecvBldg.value = getParameterByName('l');
    //Resident EID
    form.elements.s_search_id.value = getParameterByName('e');
    //Package Type
    form.sPkgDesc.value = getParameterByName('p');
    //Vendor Type
    document.getElementsByTagName("select").sVendorType.value = getParameterByName('v');
    //Vendor Notes
    form.elements.sVendorNote.value = getParameterByName('n');
    //Additional Received Notes
    form.elements.sRecvNotes_1.value = getParameterByName('a');
    //Tracking Number for Package
    form.elements.sVendorTrackingNbr.value = getParameterByName('t');
    
    //Allow auto-submission of RLA form, if applicable
    if(getParameterByName('s') == 1){
        document.rla_form.sTask.value='A';
        document.rla_form.submit();
    }
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
