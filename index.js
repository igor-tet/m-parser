var request = require('request')
	, iconv = require('iconv-lite')
	, cheerio = require('cheerio');

module.exports = function(opts, scb, ecb) {
	
	function pub (v, params) {
		params = params || {}
		formatter = params.formatter || ['n', 'trim', 'special']
		v = v || ''
		v = formatter.indexOf('n') < 0 ? v : v.replace(/\n/gi, '')
		v = formatter.indexOf('special') < 0 ? v : v.replace(/[^\w\s,\.:'\']/gi, " ")
		v = formatter.indexOf('trim') < 0 ? v : v.trim('')

		return v
	}
	function _parse (html, _params) {
		var $ = cheerio.load(iconv.decode(html, opts.encoding || 'utf-8'));


		var res = {}
		if (_params && _params.data) {

			for (var key in _params.data) {
				var params = _params.data[key]
					, skip = params.skip || 0
					, limit = (params.limit || 99999) + skip
				var index = 0;

				if (typeof params.query == 'string') {
					_parse_query(params.query)
				} else {
					params.query && params.query.forEach(_parse_query)
				}

				function _parse_query (query) {
					$(query).each(function (i, el) {
						index++
						if ((index > limit) || (index - 1 < skip)) return;
						if (params.data) {
							if (params.return_type == 'object') {
								res[key] = res[key] || _parse($(el).html(), params)						
							} else {
								res[key] = res[key] || []
								res[key].push(_parse($(el).html(), params))
							}
						} else {
							var r = params.fn_formatter ? params.fn_formatter($(el).text() || '') : $(el).text()
							r = pub(r, params)
							if (params.attr) {
								var href = ($(el).attr(params.attr) || '').replace(/\n/, '')
								href = params.attr_fn_formatter ? params.attr_fn_formatter(href, r) : href

								if (params.filter && !params.filter(href, r)) {
									r = null
								} else {
									r = {
										href: pub(href, {formatter: ['trim']}),
										name: pub(r, params)
									}
								}
							} else {
								r = (params.filter && !params.filter(href, r)) ? null : r
							}

							if (r) {

								if (params.return_type == 'object') {
									res[key] = res[key] || r
								} else {
									res[key] = res[key] || []
									res[key].push(r)
								}
							} else {
								index--
							}
							
						}
					});
				}

			}
		}

		return res
	}
	request(opts.url, function (err, res, body) {
		if (!err && res.statusCode == 200) {

			res = _parse(body, opts)

			scb && scb(res)
		} else {
			ecb && ecb(err)
		}
	})
}