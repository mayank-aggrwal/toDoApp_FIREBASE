
db.collection('toDOs').get().then((snapshot) => {
    // console.log(snapshot.docs);
    snapshot.docs.forEach((doc) => {
        console.log(doc.data().work);
    });
});