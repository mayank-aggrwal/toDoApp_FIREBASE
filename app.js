
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

// db.collection('toDOs').where('work','==','OS').orderBy('date').get().then((snapshot) => {
db.collection('toDOs').orderBy('date').onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    console.log(changes);

    changes.forEach((change) => {
        if(change.type == 'added') {
            renderList(change.doc);
        }
        else if(change.type == 'removed') {
            let li = document.querySelector('[data-id='+change.doc.id+']');
            toList.removeChild(li);
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(form.work.value == '' || form.date.value == '') {
        alert('Invalid input');
    }
    else {
        db.collection('toDOs').add({
            work: form.work.value,
            date: form.date.value
        });
        form.work.value = '';
        form.date.value = '';
    }
    
});
