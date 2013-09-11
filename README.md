# Fish Go Blub

So this grabs images from an Eye-Fi and puts them into CouchDB.

## Usage

    git clone git@github.com:natevw/fishgoblub.git
    cd fishgoblub && npm install
    node tchoffo-tchoff <eyefi-macAddress> <eyefi-uploadKey> <couch-dbUrl>

On the CouchDB side, you should get a document for every photo file. Not a [ShutterStem](https://github.com/natevw/ShutterStem)-compatible schema and really no photo metadata at all. (The emphasis here is on the uploaded original file, which in ShutterStem tends to be outside the DB.)

For a bit more details on how to prepare the Eye-Fi stuff, see the [node-eyefi documentation](https://github.com/usefulthink/node-eyefi#readme).

## In conclusion

Basically, Fish Go Blub answers the timeless question:

*If you meet a friendly horse, will you communicate by morse?*