
const toList = document.querySelector('#cafe-list');

function renderList(doc) {
    li = document.createElement('li');
    sp1 = document.createElement('span');
    sp2 = document.createElement('span');
    li.setAttribute('data-id', doc.id);

    sp1.textContent = doc.data().work;
    sp2.textContent = doc.data().date;

    li.appendChild(sp1);
    li.appendChild(sp2);
    toList.appendChild(li);
}

db.collection('toDOs').get().then((snapshot) => {
    // console.log(snapshot.docs);
    snapshot.docs.forEach((doc) => {
        renderList(doc);
    });
});