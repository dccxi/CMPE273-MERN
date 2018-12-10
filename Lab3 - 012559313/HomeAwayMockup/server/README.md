# HomeAway Mockup
## Steps to Run

0. Make sure port 3000 and 3001 are not occupied.
1. Copy MongoDB URI obtained from mLab into environment variables following this format:
```shell
> export DB_URI=mongodb://<dbuser>:<dbpassword>@dsxxxxxx.mlab.com:xxxxx/homeaway_mockup
```
2. `yarn` (or `npm i`) in both `HomeAwayMockup/servers` and `HomeAwayMockup/client` folder to download node_modulus needed.
```shell
> cd client; yarn; cd ../server; yarn
```
3. In `server` folder, run `yarn start ` (or `npm start`)
4. In `client` folder, run `yarn start` (or `npm start`)
5. Direct to `localhost:3000` in browser.
