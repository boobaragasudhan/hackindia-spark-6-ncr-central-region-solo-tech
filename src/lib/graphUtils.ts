export type GraphNode = {
  id: string;
  label: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

export type GraphLink = {
  source: string | GraphNode;
  target: string | GraphNode;
};

export type GraphDataResponse = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export function validateGraphData(data: any): data is GraphDataResponse {
  if (!data || typeof data !== 'object') return false;
  if (!Array.isArray(data.nodes) || !Array.isArray(data.links)) return false;
  
  const nodesValid = data.nodes.every((n: any) => typeof n.id === 'string' && typeof n.label === 'string');
  const linksValid = data.links.every((l: any) => typeof l.source === 'string' && typeof l.target === 'string');
  
  return nodesValid && linksValid;
}
