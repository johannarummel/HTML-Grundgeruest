
function formularsetzen()
{
    var form = document.forms;
    for (var x = 0; x < form.length; x++)
    {
        var aktuellesFeld = form[x];
        for (var y = 0; y < aktuellesFeld.elements.length; y++)
        {
            if (aktuellesFeld.elements[y].type != 'text')
            {
                continue;
            }

            aktuellesFeld.elements[y].onblur = function()
            {
                if (!this.value)
                {
                    this.value = this.defaultValue;
                }
            }

            aktuellesFeld.elements[y].onfocus = function()
            {
                if (this.value == this.defaultValue)
                {
                    this.value = "";
                }
            }
        }
    }
}
window.onload = formularsetzen;

/* http://www.kryogenix.org/code/browser/searchhi/ */

var ref = "";

// http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\\\s)" + className + "(\\\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;

	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}


function highlightWord(node,word) {
	// Iterate into this nodes childNodes
	if (node.hasChildNodes) {
		var hi_cn;
		for (hi_cn=0;hi_cn<node.childNodes.length;hi_cn++) {
			highlightWord(node.childNodes[hi_cn],word);
		}
	}


	// And do this node itself
	if (node.nodeType == 3) { // text node
		tempNodeVal = node.nodeValue.toLowerCase();
		tempWordVal = word.toLowerCase();
		if (tempNodeVal.indexOf(tempWordVal) != -1) {
			pn = node.parentNode;
			klasse = "suchwort"+w; // different colors for differnt searchterms

			if (pn.className != klasse) {
				// word has not already been highlighted!
				nv = node.nodeValue;
				ni = tempNodeVal.indexOf(tempWordVal);

				// Create a load of replacement nodes
				before = document.createTextNode(nv.substr(0,ni));
				docWordVal = nv.substr(ni,word.length);
				after = document.createTextNode(nv.substr(ni+word.length));
				hiwordtext = document.createTextNode(docWordVal);
				hiword = document.createElement("em"); // modified from span to em
       			hiword.className = klasse;
				hiword.appendChild(hiwordtext);
				pn.insertBefore(before,node);
				pn.insertBefore(hiword,node);
				pn.insertBefore(after,node);
				pn.removeChild(node);
			}
		}
	}
}



function Highlight() {
      if (window.location.search.indexOf("nohighlight") !== -1) return;
	if (!document.createElement) return;

	if (document.referrer.search(/google.+/) != -1 || document.referrer.search(/lycos.+/) != -1 || document.referrer.search(/yahoo.+/) != -1 || document.referrer.search(/fireball.+/) != -1 ||document.referrer.search(/search\.msn.+/) != -1 || document.referrer.search(/bing.+/) != -1) {
		ref = decodeURIComponent(document.referrer);
		if (ref.indexOf('?') == -1) return;
	}

	// for site search:
	// if your search file is not called suchen.*, you must modify the following line 2x!
	if (document.referrer.search(/suchen.+/) != -1 && document.URL.indexOf("suchen") == -1 ) {
		ref = unescape(document.referrer);
		if (window.location.search) ref = unescape(window.location.search);
	}

	if (window.location.search) { ref = unescape(window.location.search); }

	qs = ref.substr(ref.indexOf('?')+1);

      qs = qs.replace(/\.|,|;|!|\?|:|"|'|\//gi,'');

	qsa = qs.split('&');



	for (i=0;i<qsa.length;i++) {
		qsip = qsa[i].split('=');
	        if (qsip.length == 1 || qsip.length == 5) continue;
        	if (qsip[0] == 'q' || qsip[0] == 'query' ||qsip[0] == 'p' || qsip[0] == 's' ) { // q= for Google, p= for Yahoo, query= Fireball, Lycos etc., s= for wordpress
	        if (qsip[1].length < 3 ) continue;


			// words not to be highlighted:
//			qsip[1] = qsip[1].replace(/\"|\'|\*|;|\bbei\b|\bf?r\b|\bvon\b|\bnicht\b|\bde.\s*\b|\bdie\b|\bdas\b|\bauf\b|\bein\b|\bund\b|\bwie\b|\bkann\b|\bich\b|\bman\b|\bmit\b|\ist\b|Suchbegriff/gi,'');

			qsip[1] = qsip[1].replace(/Suchbegriff/gi,'');
                        if (document.URL.indexOf('blog') >= 1) qsip[1] = qsip[1].replace(/\d\d|\d/g,''); // 1/2-digit number in blogs

			// remove all blanks and '+' before and after searchterm (bugfix: crashes FF & Op)
			qsip[1] = qsip[1].replace(/^(\s+|\++)/,'').replace(/(\++)$/,'').replace(/(\s+)$/,'');

			if (qsip[1] != '') {
			words = unescape(qsip[1].replace(/\+/g,' ')).split(/\s+/);
				for (w=0;w<words.length;w++) {
					if (words[w].length >= 3) {

					    highlightWord(document.getElementsByTagName("body")[0],words[w]);

                                  // alternativ: Tim Reeves: nur div inhalt highlighten:
                                  // highlightWord(document.getElementById("inhalt"),words[w]);

                                  // alternativ: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
					    // highlightWord(getElementsByClassName("inhalt", "*", document)[0],words[w]);

					}
                		}
			}
	        }
	}
}

function aktivieren(socialnetwork) {
	if (socialnetwork == 'facebook') {
		var fb_url = "http://www.facebook.com/htmlseminar";

        var fb_part1 = '<div id="fb-root"></div><scr' + 'ipt id="fbscript">(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/de_DE/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</scr' + 'ipt>';

        var fb_part2 = '<div class="fb-like" data-href="' + fb_url + '" data-send="true" data-width="450" data-show-faces="true"></div>';
		document.getElementById("insertfb1").innerHTML=fb_part1;
    	document.getElementById("insertfb2").innerHTML=fb_part2;
    	eval(document.getElementById('fbscript').innerHTML);
    	document.getElementById("insertfb2").style.textAlign = 'left';
    	document.getElementById("insertfb2").style.marginLeft = '10%';
	}

	if (socialnetwork == 'google') {
		var gg_button = '<g:plusone></g:plusone>';

        var neuesScript = document.createElement("script");
			neuesScript.id = "ggscript";
			neuesScript.type = "text/javascript";
			neuesScript.src = "https://apis.google.com/js/plusone.js";
			neuesScript.innerHTML = "{lang: 'de'}";
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.appendChild(neuesScript, s);
		document.getElementById("insertgg").innerHTML=gg_button;
		eval(document.getElementById('ggscript').innerHTML);
	}
}


// click on the div
function toggle( id ) {
  var element = document.getElementById(id);
  
  if ( element.style.display == 'block' )
  {
      element.style.display = 'none';
  }
  else
  {
      element.style.display = 'block';
  }
  return false;
}

window.onload = Highlight;
