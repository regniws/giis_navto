function waitDataFromGIIS(searchString)
{
    var target = document.getElementsByTagName('TABLE');

    if(target.length != 1){
        console.log('too much tables on the page');
        return;
    }

    const config = {

        childList: true,
        subtree: true
    };

    const callback = function(mutationsList, observer) {

        var xpath = "//a[contains(text(),'" + searchString + "')]";
        var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(matchingElement != null){
            document.location.href = matchingElement.href;
            observer.disconnect();
        }

    };

    const observer = new MutationObserver(callback);
    observer.observe(target[0], config);
 
}

function performSearch(searchString)
{
    
    t.value = searchString;
    
    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("input", false, true);
        t.dispatchEvent(evt);
    }
    else
        t.fireEvent("input");

    waitDataFromGIIS(searchString);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchString = urlParams.get('amsearch');

if (searchString != undefined){

    console.log('search params found ' + searchString);
    var t = null; 
    console.log('Wait for seartch input');

    var observer = new MutationObserver(function(mutations) {
        t = document.getElementById('jhi-dmdk-search-input');
        if (t != null) {
             observer.disconnect();
             performSearch(searchString); 
         }
     });

    observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});
    
}else{
    console.log('skeep');
}