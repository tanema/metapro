import authorize from 'util/authorize';

const namespace = "metapro_todos"
const defaults = {
  namespace,
  description: "A todo item for the metapro extension",
  value_type: "string",
}

function authHeader() {
  return authorize().then((auth) => {
    return {
      'X-Shopify-Access-Token': auth.access_token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  })
}

export default class Metafield {
  constructor(props) {
    this.admin_graphql_api_id = props.admin_graphql_api_id;
    this.id = props.id;
    this.namespace = namespace;
    this.key = props.key;
    this.description = props.description;
    this.value = JSON.parse(props.value);
    this.value_type = props.value_type;
    this.owner_id = props.owner_id;
    this.owner_resource = props.owner_resource;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static get endpoint() {
    return `https://${location.host}/admin/metafields`
  }

  static findAll(resource, id) {
    const params = new URLSearchParams({
      'metafield[owner_id]': id,
      'metafield[owner_resource]': resource,
      'namespace': namespace,
    })
    const url = `${this.endpoint}.json?${params.toString()}`;
    return authHeader()
      .then((headers) => fetch(url, {headers}))
      .then((resp) => resp.json())
      .then((resp) => resp.metafields.map((metafield) => new Metafield(metafield)))
  }

  static find(id) {
    const url = `${this.endpoint}/${id}.json`;
    return authHeader()
      .then((headers) => fetch(url, {headers}))
      .then((resp) => resp.json())
      .then((resp) => new Metafield(resp.metafield));
  }

  static create(owner_resource, owner_id, value) {
    const url = `${this.endpoint}.json`;
    const metafield = {
      key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      value: JSON.stringify(value),
      owner_resource, owner_id,
      ...defaults,
    }
    return authHeader()
      .then((headers) => fetch(url, {headers, method: 'POST', body: JSON.stringify({metafield})}))
      .then((resp) => resp.json())
      .then((resp) => new Metafield(resp.metafield));
  }

  save() {
    const url = `${Metafield.endpoint}/${this.id}.json`
    const metafield = {
      value: JSON.stringify(this.value)
    }
    return authHeader()
      .then((headers) => fetch(url, {headers, method: 'PUT', body: JSON.stringify({metafield})}))
      .then((resp) => resp.json())
      .then((resp) => new Metafield(resp.metafield))
      .catch(console.log);
  }

  delete() {
    const url = `${Metafield.endpoint}/${this.id}.json`
    return authHeader()
      .then((headers) => fetch(url, {headers, method: 'DELETE'}))
      .catch(console.log)
  }
}
