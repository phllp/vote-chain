import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Vote } from "@/core/entities/vote";

type ChartVotesByCandidateProps = {
  votes: Vote[];
};

type VoteCount = {
  candidateName: string;
  count: number;
};

const ChartVotesByCandidate: React.FC<ChartVotesByCandidateProps> = ({
  votes,
}) => {
  // Calcula o total de votos por candidato
  const voteCounts: VoteCount[] = votes.reduce((acc, vote) => {
    const candidate = acc.find((v) => v.candidateName === vote.candidateName);
    if (candidate) {
      candidate.count += 1;
    } else {
      acc.push({ candidateName: vote.candidateName!, count: 1 });
    }
    return acc;
  }, [] as VoteCount[]);

  // Calcula o teto superior do eixo Y
  const maxVotes = Math.max(...voteCounts.map((vote) => vote.count));
  const yAxisMax = Math.ceil(maxVotes * 1.1); // Adiciona 10% ao valor máximo

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votes by Candidate</CardTitle>
        <CardDescription>Total votes by candidate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          {/* Contêiner Responsivo para o Gráfico */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={voteCounts}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="candidateName"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              >
                <Label value="Candidates" position="bottom" offset={10} />
              </XAxis>
              <YAxis
                allowDecimals={false}
                domain={[0, yAxisMax]} // Define o teto superior do eixo Y
              >
                <Label
                  value="Number of Votes"
                  angle={-90}
                  position="insideLeft"
                  offset={-10}
                />
              </YAxis>
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#2196f3" // Cor padrão para barras
                barSize={20} // Espessura das barras
                radius={[8, 8, 0, 0]} // Bordas arredondadas na parte superior
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total votes received by each candidate
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartVotesByCandidate;
