FROM node:25.8-bookworm-slim

ARG IDF_PATH=/opt/local/esp-idf
ARG IDF_GIT_TAG=v5.5.3
ARG IDF_TARGETS=esp32,esp32c6

ENV IDF_PATH=$IDF_PATH
ENV IDF_TOOLS_PATH=/root/.espressif

RUN apt update

# ESP-IDF dependencies
RUN apt install -y \
    git \
    wget \
    flex \
    bison \
    gperf \
    python3 \
    python3-pip \
    python3-venv \
    pipenv \
    cmake \
    ninja-build \
    ccache \
    libffi-dev \
    libssl-dev \
    dfu-util \
    libusb-1.0-0

RUN git clone -b $IDF_GIT_TAG --recursive https://github.com/espressif/esp-idf.git $IDF_PATH

RUN cd $IDF_PATH && \
    ./install.sh $IDF_TARGETS

RUN apt install -y \
    zsh \
    udev \
    iputils-ping \
    usbutils 

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/bin/sh"]
