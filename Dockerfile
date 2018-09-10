FROM node:10-alpine

RUN adduser --disabled-password --gecos '' appuser
USER appuser

WORKDIR /home/appuser

# Set production mode env
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --non-interactive --production && \
    yarn cache clean

# Copy sources
COPY . .

# Generate license disclaimer
# RUN yarn licenses generate-disclaimer > ./static/LICENSE.txt

# Run build
RUN yarn build

# Expose port 3000
# Make sure the application listen $PORT, not 3000, in Environment when otherwise specified
# if you are to run this in Heroku container environment.
EXPOSE 3000
CMD [ "yarn", "serve" ]
