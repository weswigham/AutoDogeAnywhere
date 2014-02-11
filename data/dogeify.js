
alert('Running...');

var re = /\b(D[A-Za-z0-9]{33})\b/;

function getChildText(elem) {
  var text_elems = [];
  for (var i = 0; i < elem.childNodes.length; i++) {
    var curNode = elem.childNodes[i];
    if (curNode.nodeName === "#text") {
      text_elems.push({text: curNode.nodeValue || '', obj: curNode, parent: elem});
    }
  }
  return text_elems;
}

function visitLinkChildren(elem, addr) {
  var textobjs = getChildText(elem);

  for (var k = 0; k<textobjs.length; k++) {
    var text = textobjs[k].text;
    var node = textobjs[k].obj;
    var match = re.exec(text);
    if (match) {
      if (match[0] !== addr) {
        node.innerHTML += '<strong>Linked Dogecoin address does not match displayed one!</strong>';
      }
    }
  }

  var nodes = elem.childNodes;
  for (var k=0; k<nodes.length; k++) {
    visitLinkChildren(nodes[k], addr);
  }
}

function visitChildren(elem) {
  var textobjs = getChildText(elem);
  for (var k = 0; k<textobjs.length; k++) {
    var tobj = textobjs[k];
    var text = tobj.text;
    var node = tobj.obj;
    var parent = tobj.parent;
    var match = re.exec(text);
    if (match) {
      alert('Match found: '+match[0])
      var replacement = text.replace(re, '<a href=\'dogecoin:$1?label='+window.location.href+'\'>$1</a>');
      var new_node = document.createElement('span');
      new_node.innerHTML = replacement;
      alert(new_node);
      alert(parent);
      parent.replaceChild(new_node, node);
    }
  }
  var nodes = elem.childNodes;
  for (var k=0; k<nodes.length; k++) {
    var node = nodes[k];
    if (node.tagName==='A') {
      var match = re.exec(node.href);
      if (match) {
        visitLinkChildren(node, match[0]);
      }
    } else {
      visitChildren(node);
    }
  }
}

visitChildren(document.body);