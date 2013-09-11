var fs = require('fs'),
    eyefi = require('eyefi'),
    fermata = require('fermata');

var macAddress = process.argv[2].replace(/-/g, '').toLowerCase(),
    uploadKey = process.argv[3],
    dbUrl = process.argv[4];

var cfg = {
    uploadPath : "/tmp/",
    cards: {}
};
cfg.cards[macAddress] = {uploadKey:uploadKey};

var server = eyefi(cfg),
    destDB = fermata.json(dbUrl);


destDB.get(function (e,d) {         // check DB available before accepting images
    if (e) throw e;
    else server.start();
});

server.on('imageReceived', function(data) {
    var file = data.filename.slice(cfg.uploadPath.length);
    console.log("received an image: "+file);
    
    destDB.post({'com.stemstorage.toot':true, file:file, uploaded:new Date().toISOString()}, function (e,d) {
        if (e) console.error(e);
        else fs.readFile(data.filename, function (e,file) {       // TODO: streams support in Fermata already!!!
            if (e) console.error(e);
            else destDB(d.id, 'original', {rev:d.rev}).put({'Content-Type':"image/jpeg"}, file, function (e,d) {
                if (e) console.error(e);
                else console.log("Saved image to "+destDB[d.id]['original']());
                fs.unlink(data.filename, function (e) {
                    if (e) console.warn(e);
                });
            });
        });
    });
});

server.on('uploadProgress', function(progress) {
    if (!progress.received) console.log("Receiving new upload.");
    //var pct = (100*progress.received/progress.expected).toFixed(2);
    //console.log(pct+"% complete");
});