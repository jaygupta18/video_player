const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935, // RTMP Port
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8080, // HTTP Server for HLS/MPEG-DASH Streaming
    allow_origin: '*'
  },
  trans: {
    ffmpeg: "/usr/bin/ffmpeg", // Make sure FFmpeg is installed on your system
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
      }
    ]
  }
};

const nms = new NodeMediaServer(config);
nms.run();
