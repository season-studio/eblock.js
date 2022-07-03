export const generateID = (
                            (typeof crypto.randomUUID === "function") 
                                ? crypto.randomUUID.bind(crypto) 
                                : function () { return crypto.getRandomValues(new Uint8Array(10)).join("-"); }
                          );