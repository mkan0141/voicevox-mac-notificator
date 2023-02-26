#!/bin/bash

# voicevox setup
# https://github.com/VOICEVOX/voicevox_engine#docker-%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8
docker pull voicevox/voicevox_engine:cpu-ubuntu20.04-latest
docker run --rm -p '127.0.0.1:50021:50021' voicevox/voicevox_engine:cpu-ubuntu20.04-latest
