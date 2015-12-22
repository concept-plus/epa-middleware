FROM    centos:centos6
MAINTAINER Concept Plus, LLC --- Alex Rangeo

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

RUN rm -rf /src
#changing to link to dist folder instead of src folder to serve up the site
ADD . /src

# Install app dependencies
RUN cd /src; npm install

EXPOSE  8181

CMD ["node", "/src/app.js"]