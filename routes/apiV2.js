let express = require('express');
let router = express.Router();
let apiV2DBService = require('../service/apiV2DBService');
const BigNumber = require('bignumber.js');

router.get('/collectible/tokenId/:tokenId', function (req, res) {
    return apiV2DBService.queryCollectibleByTokenId(req.params.tokenId).then(res.json)
})

router.get('/collectibles/creator/:creator', function (req, res) {
    return apiV2DBService.queryCollectibleByOther('creator', req.params.creator)
})

router.get('/collectibles/owner/:owner', function (req, res) {
    return apiV2DBService.queryCollectibleByOther('owner', req.params.owner)
})

router.get('/collectibles/keyword/:keyword', function (req, res) {
    return apiV2DBService.queryCollectibleByOther('keyword', req.params.keyword)
})

router.get('/collectibles/all', function (req, res) {
    return apiV2DBService.queryAllCollectibles()
})

router.get('/creators/all', function (req, res) {
    return apiV2DBService.queryAllCreators()
})

router.get('/orders/filled/tokenId/:tokenId', function (req, res) {
    return apiV2DBService.queryOrders('2', 'tokenId', req.params.tokenId)
})

router.get('/orders/filled/seller/:seller', function (req, res) {
    return apiV2DBService.queryOrdersBySeller('2',  req.params.seller)
})

router.get('/orders/filled/buyer/:buyer', function (req, res) {
    return apiV2DBService.queryOrders('2', 'buyer', req.params.buyer)
})

router.get('/orders/filled/keyword/:keyword', function (req, res) {
    return apiV2DBService.queryOrdersByKeyword('2', 'keyword', req.params.keyword)
})

router.get('/orders/filled/all', function (req, res) {
    return apiV2DBService.queryAllOrder('2')
})

router.get('/orders/canceled/tokenId/:tokenId', function (req, res) {
    return apiV2DBService.queryOrders('3', 'tokenId', req.params.tokenId)
})

router.get('/orders/canceled/seller/:seller', function (req, res) {
    return apiV2DBService.queryOrdersBySeller('3', req.params.seller)
})

router.get('/orders/canceled/all', function (req, res) {
    return apiV2DBService.queryAllOrder('3')
})

router.get('/orders/sale/tokenId/:tokenId', function (req, res) {
    return apiV2DBService.queryOrders('1', 'tokenId', req.params.tokenId)
})

router.get('/orders/sale/seller/:seller', function (req, res) {
    return apiV2DBService.queryOrdersBySeller('1', req.params.seller)
})

router.get('/orders/sale/all', function (req, res) {
    return apiV2DBService.queryAllOrder('1')
})

router.get('/orders/priceChanged/tokenId/:tokenId', function (req, res) {
    return apiV2DBService.queryOrderPriceChangeHistory(req.params.tokenId)
})

router.get('/orders/priceChanged/seller/:seller', function (req, res) {

})


router.get('/giveaways/tokenId/:tokenId', function (req, res) {
    return apiV2DBService.queryGatewaysToken('tokenId', req.params.tokenId);
})

router.get('/giveaways/sender/:sender', function (req, res) {
    return apiV2DBService.queryGatewaysToken('from', req.params.sender);
})

router.get('/giveaways/recipient/:recipient', function (req, res) {
    return apiV2DBService.queryGatewaysToken('to', req.params.recipient);
})

router.get('/giveaways/royaltyowner/:royaltyowner', function (req, res) {
    return apiV2DBService.queryGatewaysTokenByRoyaltyOwner(req.params.royaltyowner);
})

module.exports = router;
