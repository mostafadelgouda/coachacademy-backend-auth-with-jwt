import { z } from "zod";

export const validate = (schema) => {
  const fun = (req, res, next) => {
    const r = schema.safeParse(req.body);
    if (!r.success) return res.status(400).json({ errors: r.error.issues });
    req.body = r.data;
    next();
  };
  return fun;
};
