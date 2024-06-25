/**
 * @name FakeUnmute&Undeafen
 * @version 1
 * @description Allows you to fake unmute/undeafen yourself in Discord which grants you the ability to hear/speak whilst the unmute/undeafen icon appears.
 * @author Mashiron
 * @source https://github.com/Mashiron01035
 */

module.exports = class FakeUnMuteUnDeafen {
  start() {

    let React = BdApi.React;
    let Patcher = BdApi.Patcher;
    
    var text = new TextDecoder("utf-8");

    WebSocket.prototype.original = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
      if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
        let decodedData = text.decode(data);
        if (decodedData.includes('"self_deaf":true') || decodedData.includes('"self_mute":true')) {
          decodedData = decodedData.replace('"self_deaf":true', '"self_deaf":false').replace('"self_mute":true', '"self_mute":false');
          data = new TextEncoder().encode(decodedData);
        }
      }
      WebSocket.prototype.original.apply(this, [data]);
    };
    BdApi.alert("Enabled", `You can now unmute or undeafen yourself and it will show for others.`);
    BdApi.Plugins.disable('FakeUnmute&Undeafen')
  }
  stop() {}
};
