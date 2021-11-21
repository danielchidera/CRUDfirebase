import React,{useEffect, useState} from "react"
import styled from "styled-components"
import {TiDeleteOutline} from "react-icons/ti"
import moment from "moment";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
// import Spinner from 'react-bootstrap/Spinner'

const First = () => {

          const [quote, setQuote] = useState([]);
        
          const [name, setName] = useState(""); 
          const [text, setText] = useState("");
          const [image, setImage] = useState(null);
        
          const uploadImage = (e) => {
            const file = e.target.files[0];
            const saveImage = URL.createObjectURL(file);
            setImage(saveImage);
          };
        
          const addItems = () => {
            const newID = quote.length + 1;
        
            const newData = {
              id: newID,
              name,
              myQuote: text,
              time: Date.now(),
              avatar: image,
            };
        
            setQuote([...quote, newData]);
          };
        
          const deleteItem = (id) => {
            const removeItem = quote.filter((el) => el.id !== id);
            setQuote(removeItem);
          };
        
          useEffect(() => {
            const saveItem = JSON.parse(localStorage.getItem("storage"));
            setQuote(saveItem);
          }, []);
        
          useEffect(() => {
            localStorage.setItem("storage", JSON.stringify(quote));
          }, [quote]);
    return(
        <Container>
       <InputContainer>
         <DisplayHolder>
           {image ? <Display src={image} /> : null}
           <InputsValue>
             <MyInputs placeholder="Title" type="file" onChange={uploadImage}/>
             <MyInputss
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
 
            <MyInputsArea
              placeholder="Qoute"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </InputsValue>{" "}
          {image ? (
            <MyButton
              type="primary"
              danger
              onClick={() => {
                console.log(image, name, text);
                addItems();
                setName("");
                setText("");
                setImage("");
                
              }}
            >
              Add
            </MyButton>
          ) : null}
        </DisplayHolder>
      </InputContainer>

      <Hold>
      <Wrapper>
        {quote.map(({ id, time, name, avatar, myQuote }) => (
          <Card key={id}>
            <TopBox>
              <Cancel
                onClick={() => {
                  deleteItem(id);
                  console.log("I am Pressed");
                  console.log(id);
                }}
              >
                <TiDeleteOutline />
              </Cancel>
              <Image src={avatar} />
            </TopBox>
            <InnerBox>
              <Name>{name}</Name>
              <Quote>{myQuote}</Quote>
              <Time>{moment(time).fromNow()}</Time>
            </InnerBox>
          </Card>
        ))}
      </Wrapper>
      </Hold>
    </Container>
    )
}

export default First

const InputContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 40px 0;
// `
const Display = styled.img`
  object-fit: cover;
  width: 250px;
  height: 200px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgb(255 54 50 / 69%) 0px 16px 30px -10px,
    rgb(0 0 0 / 13%) 0px 16px 10px -10px;
`
const MyButton = styled(Button)`
  width: 300px;
  margin: 30px 0 0 30px;
  font-weight: bold;
  text-transform: uppercase;
`
const MyInputss = styled(Input)`
// background-color: gray;
`
const MyInputs = styled(Input)`
  margin: 10px 0;
  
` 
const MyInputsArea = styled(TextArea)`
  margin: 10px 0;
  height: 60px;
  resize: none;
  // background-color: green;
`

const InputsValue = styled.div`
  width: 300px;
  background-color: #121211;
`

const DisplayHolder = styled.div` 
  display: flex;
  width: 80%;
  justify-content: center;
  flex-wrap: wrap;
`

const InnerBox = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
`;
const Name = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
`
const Quote = styled.div` 
  flex: 1;
  width: 70%;
  text-align: center;
  font-size: 14px;
  text-transform: capitalize;
`
const Time = styled.div`
  font-size: 10px;
  padding-bottom: 10px;
  font-weight: bold;
`

const Card = styled.div`
background-color: black;
  border: 1px solid gray;
  border-radius: 5px;
  height: 300px;
  width: 250px;
  transition: all 350ms;
  transform: scale(1);
  margin: 10px;
  :hover {
    border: 1px solid lightgray;
    transform: scale(1.01);
  }
`
const TopBox = styled.div`
  height: 100px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  /* align-items: center; */
  position: relative;
`
const Cancel = styled.div`
  color: red;
  position: absolute;
  right: 0;
  margin-right: 10px;
  margin-top: 10px;
  font-weight: bold;
  transform: scale(1);
  transition: all 360ms;
  opacity: 0.7;
 
  :hover {
    transform: scale(1.2);
    cursor: pointer;
    opacity: 1;
  }
`

const Image = styled.img`
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 50%;
  right: 0;
  margin-top: 50px;
  object-fit: cover;
  border: 4px solid white;
`

const Container = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  color: white;
  ARivetm

  padding-top: 60px;
  font-family: Poppins;
`
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // background-color: tomato;
  margin: 50px 0 0 0;
  
`

const Hold = styled.div`
display: flex;
justify-content: center;
// background-color: red;
margin: 20px 200px 0 200px;
`