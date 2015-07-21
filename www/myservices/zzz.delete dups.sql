DELETE FROM NAMES
 WHERE id NOT IN (SELECT * 
                    FROM (SELECT MIN(n.id)
                            FROM NAMES n
                        GROUP BY n.name) x)


DELETE FROM zipad_pe_kneexrays
 WHERE wrid NOT IN (SELECT * 
                    FROM (SELECT MIN(n.wrid)
                            FROM zipad_pe_kneexrays n
                        GROUP BY n.ClinixRID) x)