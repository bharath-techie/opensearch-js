/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict';

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils');
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path'];
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path' };

function ShutdownApi(transport, ConfigurationError) {
  this.transport = transport;
  this[kConfigurationError] = ConfigurationError;
}

ShutdownApi.prototype.deleteNode = function shutdownDeleteNodeApi(params, options, callback) {
  [params, options, callback] = normalizeArguments(params, options, callback);

  // check required parameters
  if (params.node_id == null && params.nodeId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: node_id or nodeId');
    return handleError(err, callback);
  }

  let { method, body, nodeId, node_id, ...querystring } = params;
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);

  let path = '';
  if (method == null) method = 'DELETE';
  path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'shutdown';

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring,
  };

  return this.transport.request(request, options, callback);
};

ShutdownApi.prototype.getNode = function shutdownGetNodeApi(params, options, callback) {
  [params, options, callback] = normalizeArguments(params, options, callback);

  let { method, body, nodeId, node_id, ...querystring } = params;
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);

  let path = '';
  if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET';
    path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'shutdown';
  } else {
    if (method == null) method = 'GET';
    path = '/' + '_nodes' + '/' + 'shutdown';
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring,
  };

  return this.transport.request(request, options, callback);
};

ShutdownApi.prototype.putNode = function shutdownPutNodeApi(params, options, callback) {
  [params, options, callback] = normalizeArguments(params, options, callback);

  // check required parameters
  if (params.node_id == null && params.nodeId == null) {
    const err = new this[kConfigurationError]('Missing required parameter: node_id or nodeId');
    return handleError(err, callback);
  }
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body');
    return handleError(err, callback);
  }

  let { method, body, nodeId, node_id, ...querystring } = params;
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);

  let path = '';
  if (method == null) method = 'PUT';
  path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'shutdown';

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring,
  };

  return this.transport.request(request, options, callback);
};

Object.defineProperties(ShutdownApi.prototype, {
  delete_node: {
    get() {
      return this.deleteNode;
    },
  },
  get_node: {
    get() {
      return this.getNode;
    },
  },
  put_node: {
    get() {
      return this.putNode;
    },
  },
});

module.exports = ShutdownApi;
