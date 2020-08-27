import React from "react";

import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error,setError] = React.useState('');

React.useEffect(() => {
    const {name,description,mediaUrl,price} = product;
    if(name === "" || description === "" || mediaUrl === "" || mediaUrl === ""){
      setDisabled(true);
    }
    else{
      setDisabled(false);
    }
  
})


  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "mediaUrl") {
      setProduct(prevState => ({ ...prevState, [name]: value }));
      setMediaPreview(value);
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
    
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", product.media);
    data.append("upload_preset", "reactshopping");
    data.append("cloud_name", "reactshp");
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
try {
  setError('');
  event.preventDefault();
  setLoading(true);
  // const mediaUrl = await handleImageUpload();
  // console.log({ mediaUrl });

  const url = `${baseUrl}/api/product`;
  const { name, price, description, mediaUrl } = product;
  const payload = { name, price, description, mediaUrl };
  const response = await axios.post(url, payload);
  //console.log({ response });
  setProduct(INITIAL_PRODUCT);
  setSuccess(true);
} catch (error) {
  catchErrors(error,setError);
  console.error("Error Msg : " ,error);
}
finally{
  setLoading(false); 
}

  }

  return (
    <div className="bg">
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
      <Message
          error
          header="Ooops!"
          content={error}
        />
           <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="mediaUrl"
            type="text"
            label="Media"
            placeholder="Media Url"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </div>
  );
}

export default CreateProduct;
