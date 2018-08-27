exports.jdone = function(err, obj, req, res, err_msg, msg) {
  if (err) {
    console.log(err);
    res.status(500).send(err_msg);
  } else {
    console.log(msg);
    res.json(obj);
  }
}

exports.done = function(err, obj, req, res, err_msg, msg) {
  if (err) {
    console.log(err);
    res.status(500).send(err_msg);
  } else {
    res.status(200).send(msg);
  }
}
