import {Request, Response} from 'express';
import axios, {AxiosResponse} from 'axios';
import {DbConcurrencyError, InternalServerError} from '../dto/error';

interface Operation {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

const getOperations = async (req: Request, res: Response) => {
  try {
    const result: AxiosResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    const operations: [Operation] = result.data;
    return res.status(200).json({
      message: operations,
    });
  } catch (error) {
    if (error instanceof DbConcurrencyError) {
      //TODO: send message alert problem
      throw 'Error concurrency';
    }

    if (error instanceof InternalServerError) {
      //TODO: process internal server error
      //TODO: log error
      throw 'InternalServerError';
    }

    throw error; //'Error generic';
  }
};

const getOperation = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result: AxiosResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const operation: Operation = result.data;
  return res.status(200).json({
    message: operation,
  });
};

const updateOperation = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const title: string = req.body.title ?? null;
  const body: string = req.body.body ?? null;
  const response: AxiosResponse = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      ...(title && {title}),
      ...(body && {body}),
    }
  );
  return res.status(200).json({
    message: response.data,
  });
};

const deleteOperation = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.status(200).json({
    message: 'operation deleted successfully',
  });
};

const addOperation = async (req: Request, res: Response) => {
  const title: string = req.body.title;
  const body: string = req.body.body;
  const response: AxiosResponse = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      title,
      body,
    }
  );
  return res.status(200).json({
    message: response.data,
  });
};

export default {
  getOperations,
  getOperation,
  updateOperation,
  deleteOperation,
  addOperation,
};
