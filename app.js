
const toList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderList(doc) {
    li = document.createElement('li');
    sp1 = document.createElement('span');
    sp2 = document.createElement('span');
    cross = document.createElement('div');
    li.setAttribute('data-id', doc.id);

    cross.textContent = 'x';
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('toDOs').doc(id).delete();
    });

    sp1.textContent = doc.data().work;
    sp2.textContent = doc.data().date;

    li.appendChild(cross);
    li.appendChild(sp1);
    li.appendChild(sp2);
    toList.appendChild(li);
}

db.collection('toDOs').where('work','==','OS').orderBy('date').get().then((snapshot) => {
    // console.log(snapshot.docs);
    snapshot.docs.forEach((doc) => {
        renderList(doc);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('toDOs').add({
        work: form.work.value,
        date: form.date.value
    });
    form.work.value = '';
    form.date.value = '';
});
