public class Reverse {

    Node first;
    Node last;


    public void reverse(){
        Node thisNode = first;
        while (thisNode != null){
            Node next = thisNode.nextNode;
            Node prev = thisNode.prev;
            thisNode.nextNode = prev;
            thisNode.prev = next;

            if (prev == null){
                last = thisNode;
            }

            if (next == null){
                first = thisNode;
            }

            thisNode = next;

        }
    }

}
