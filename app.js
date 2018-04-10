var zookeeper = require('node-zookeeper-client');

var client = zookeeper.createClient('192.168.1.153:32004,192.168.1.154:32004,192.168.1.155:32004');
var path = "/testNodeJsRootPath";
var pathChild = path+"/testChildPathOne";

client.once('connected', function () {
    console.log('Connected to the server.');

    //创建一个目录节点
    client.create(path, function (error) {
        if (error) {
            console.log('Failed to create node: %s due to: %s.', path, error);
        } else {
            console.log('Node: %s is successfully created.', path);
        }
    });

    //创建一个子目录节点
    client.create(pathChild, function (error) {
        if (error) {
            console.log('Failed to create node: %s due to: %s.', path, error);
        } else {
            console.log('Node: %s is successfully created.', pathChild);
        }
    });

    // 取出子目录节点列表
    client.getChildren(path, function (error, children, stats) {
        if (error) {
            console.log(error.stack);
            return;
        }

        console.log('Children are: %j.', children);
    });

    //目录节点状态
    client.exists(path, function (error, stat) {
        if (error) {
            console.log(error.stack);
            return;
        }

        if (stat) {
            console.log('Node exists.');
        } else {
            console.log('Node does not exist.');
        }
    });

    //删除子目录节点
    client.remove(pathChild, -1, function (error) {
        if (error) {
            console.log(error.stack);
            return;
        }
        console.log('Node %s is deleted.',pathChild);
    });

    //删除父目录节点
    client.remove(path, -1, function (error) {
        if (error) {
            console.log(error.stack);
            return;
        }
        console.log('Node %s is deleted.',path);
    });

    //关闭链接
    client.close();

});
//执行
client.connect();
