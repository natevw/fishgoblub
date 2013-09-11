function (doc) {
    if (doc['com.stemstorage.toot'] && '_attachments' in doc) emit(doc.uploaded);
}